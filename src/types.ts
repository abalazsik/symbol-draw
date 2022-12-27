
interface Point {
    x: number, y: number
}

export interface Bounds {
    left: number,
    top: number,
    right: number,
    bottom: number
}

interface Rect {
    x: number, y: number, width: number, height: number
};

export class LineSegment {

    points: Point[] = [];

    constructor() { }

    add(x: number, y: number) {
        this.points.push({ x, y });
    }

    getBounds(): Bounds {
        if (this.points.length === 0) {
            throw "Empty segment!";
        }

        let minX = this.points[0].x, maxX = this.points[0].x;
        let minY = this.points[0].y, maxY = this.points[0].y;

        this.points.forEach(point => {
            if (point.x < minX) {
                minX = point.x;
            }

            if (point.x > maxX) {
                maxX = point.x;
            }

            if (point.y < minY) {
                minY = point.y;
            }

            if (point.y > maxY) {
                maxY = point.y;
            }
        });

        return { left: minX, top: minY, right: maxX, bottom: maxY };
    }

    normalize(bounds: Bounds, width: number, height: number) {
        const origWidth = bounds.right - bounds.left;
        const origHeight = bounds.bottom - bounds.top;
        const cx = (bounds.right + bounds.left) / 2;
        const cy = (bounds.bottom + bounds.top) / 2;


        this.points = this.points.map(point => {

            const dx = (point.x - cx) / origWidth;
            const dy = (point.y - cy) / origHeight;

            return {
                x: (width / 2) + dx * width,
                y: (height / 2) + dy * height
            };
        });
    }

    toString(): string {
        return this.points.map(point => `${point.x},${point.y}`).join(" ");
    }

    isEmpty(): boolean {
        return this.points.length === 0;
    }
};

export class Path {
    id: number = 0;
    segments: LineSegment[] = [];
    cachedBounds: Bounds | undefined = undefined;

    constructor() { }

    add(segment: LineSegment) {
        this.segments.push(segment);
        this.invalidateBounds();
    }

    getSegments(): LineSegment[] {
        return this.segments;
    }

    invalidateBounds() {
        this.cachedBounds = undefined;
    }

    getBounds(): Bounds {
        if (this.segments.length === 0) {
            throw "Empty Path!";
        }

        if (this.cachedBounds !== undefined) {
            return this.cachedBounds;
        }

        let bounds = this.segments[0].getBounds();

        this.segments.forEach(segment => {
            const _bounds = segment.getBounds();

            if (_bounds.left < bounds.left) {
                bounds.left = _bounds.left;
            }

            if (_bounds.right > bounds.right) {
                bounds.right = _bounds.right;
            }

            if (_bounds.top < bounds.top) {
                bounds.top = _bounds.top;
            }

            if (_bounds.bottom > bounds.bottom) {
                bounds.bottom = _bounds.bottom;
            }
        });

        this.cachedBounds = bounds;

        return bounds;
    }

    normalize(width: number, height: number) {
        const bounds = this.getBounds();

        this.segments.forEach(segment => {
            segment.normalize(bounds, width, height);
        });

        this.invalidateBounds();
    }
}

