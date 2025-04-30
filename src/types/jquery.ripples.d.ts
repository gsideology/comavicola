interface JQuery {
  ripples(options?: {
    resolution?: number;
    dropRadius?: number;
    perturbance?: number;
    interactive?: boolean;
    imageUrl?: string;
    crossOrigin?: string;
  }): JQuery;
  ripples(command: 'destroy' | 'hide' | 'show' | 'pause' | 'play'): JQuery;
  ripples(command: 'drop', x: number, y: number, radius: number, strength: number): JQuery;
  ripples(command: 'set', name: string, value: any): JQuery;
  ripples(command: 'updateSize'): JQuery;
} 