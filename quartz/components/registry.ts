import { QuartzComponent, QuartzComponentConstructor } from "./types"

export interface ComponentManifest {
  name: string
  displayName: string
  description: string
  version: string
  quartzVersion?: string
  author?: string
  homepage?: string
}

export interface RegisteredComponent {
  component: QuartzComponent | QuartzComponentConstructor
  source: string
  manifest?: ComponentManifest
}

class ComponentRegistry {
  private components = new Map<string, RegisteredComponent>()
  private instanceCache = new Map<string, QuartzComponent>()

  register(
    name: string,
    component: QuartzComponent | QuartzComponentConstructor,
    source: string,
    manifest?: ComponentManifest,
  ): void {
    const existing = this.components.get(name)
    if (existing && existing.source !== source) {
      console.warn(`Component "${name}" is being overwritten by ${source}`)
    }
    this.components.set(name, { component, source, manifest })
  }

  get(name: string): RegisteredComponent | undefined {
    return this.components.get(name)
  }

  getAll(): Map<string, RegisteredComponent> {
    return new Map(this.components)
  }

  /**
   * Instantiate a component constructor with options, returning a cached instance
   * if the same constructor was already called with equivalent options.
   * This prevents duplicate afterDOMLoaded scripts when the same component
   * appears in multiple page-type layouts.
   */
  instantiate(
    constructor: QuartzComponentConstructor<any>,
    options?: Record<string, unknown>,
  ): QuartzComponent {
    const optsKey = options !== undefined ? JSON.stringify(options) : ""
    // Use constructor identity + serialized options as cache key
    // We store constructor name as a hint but rely on a unique id for identity
    const ctorId =
      (constructor as unknown as { __cacheId?: string }).__cacheId ??
      ((constructor as unknown as { __cacheId: string }).__cacheId =
        `ctor_${this.instanceCache.size}`)
    const cacheKey = `${ctorId}:${optsKey}`

    const cached = this.instanceCache.get(cacheKey)
    if (cached) return cached

    const instance = constructor(options)
    this.instanceCache.set(cacheKey, instance)
    return instance
  }

  getAllComponents(): QuartzComponent[] {
    // Deduplicate by component reference (same constructor may be registered under multiple keys)
    const seen = new Set<QuartzComponent | QuartzComponentConstructor>()
    const results: QuartzComponent[] = []
    for (const r of this.components.values()) {
      if (seen.has(r.component)) continue
      seen.add(r.component)
      try {
        let instance: QuartzComponent
        if (typeof r.component === "function") {
          instance = this.instantiate(r.component as QuartzComponentConstructor, undefined)
        } else {
          instance = r.component as QuartzComponent
        }
        if (instance) {
          results.push(instance)
        }
      } catch {
        // Skip components that fail to instantiate
      }
    }
    return results
  }
}

export const componentRegistry = new ComponentRegistry()

export function defineComponent<Options extends object | undefined = undefined>(
  factory: QuartzComponentConstructor<Options>,
  manifest: ComponentManifest,
): QuartzComponentConstructor<Options> {
  ;(factory as any).__quartzComponent = { manifest }
  return factory
}
