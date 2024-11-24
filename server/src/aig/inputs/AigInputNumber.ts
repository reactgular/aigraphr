import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef } from '../types/AigTypeBase';

export class AigInputNumber extends AigTypeBase<number, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.Number,
            description: ''
        });
    }

    public gte(value: number, reason?: string) {
        this.constraint({
            rule: num => num >= value,
            reason: reason ?? `The number must be greater than or equal to ${value}`
        });
        return this;
    }

    public gt(value: number, reason?: string) {
        this.constraint({
            rule: num => num > value,
            reason: reason ?? `The number must be greater than ${value}`
        });
        return this;
    }

    public lte(value: number, reason?: string) {
        this.constraint({
            rule: num => num <= value,
            reason: reason ?? `The number must be less than or equal to ${value}`
        });
        return this;
    }

    public lt(value: number, reason?: string) {
        this.constraint({
            rule: num => num < value,
            reason: reason ?? `The number must be less than ${value}`
        });
        return this;
    }

    public max(value: number, reason?: string) {
        this.constraint({
            rule: num => num <= value,
            reason: reason ?? `The number must be at most ${value}`
        });
        return this;
    }

    public min(value: number, reason?: string) {
        this.constraint({
            rule: num => num >= value,
            reason: reason ?? `The number must be at least ${value}`
        });
        return this;
    }

    public integer(reason?: string) {
        this.constraint({
            rule: num => Number.isInteger(num),
            reason: reason ?? 'The number must be an integer'
        });
        return this;
    }

    public positive(reason?: string) {
        this.constraint({
            rule: num => num > 0,
            reason: reason ?? 'The number must be positive'
        });
        return this;
    }

    public negative(reason?: string) {
        this.constraint({
            rule: num => num < 0,
            reason: reason ?? 'The number must be negative'
        });
        return this;
    }

    public notNaN(reason?: string) {
        this.constraint({
            rule: num => !Number.isNaN(num),
            reason: reason ?? 'The number must not be NaN'
        });
        return this;
    }

    public notInfinity(reason?: string) {
        this.constraint({
            rule: num => Number.isFinite(num),
            reason: reason ?? 'The number must not be Infinity'
        });
        return this;
    }
}
