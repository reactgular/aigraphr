import {AigType} from '../types/AigType';
import {AigTypeBase, AigTypeDef} from '../types/AigTypeBase';

export class AigInputString extends AigTypeBase<string, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.String,
            description: ''
        });
    }

    public alphabetic(reason?: string): this {
        this.constraint({
            rule: (str) => /^[a-zA-Z]+$/.test(str),
            reason:
                reason ?? 'The string must contain only alphabetic characters'
        });
        return this;
    }

    public alphanumeric(reason?: string): this {
        this.constraint({
            rule: (str) => /^[a-zA-Z0-9]+$/.test(str),
            reason:
                reason ?? 'The string must contain only alphanumeric characters'
        });
        return this;
    }

    public contains(substring: string, reason?: string): this {
        this.constraint({
            rule: (str) => str.includes(substring),
            reason: reason ?? `The string must contain ${substring}`
        });
        return this;
    }

    public email(reason?: string): this {
        this.constraint({
            rule: (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),
            reason: reason ?? 'The string must be a valid email address'
        });
        return this;
    }

    public endsWith(suffix: string, reason?: string): this {
        this.constraint({
            rule: (str) => str.endsWith(suffix),
            reason: reason ?? `The string must end with ${suffix}`
        });
        return this;
    }

    public lowercase(reason?: string): this {
        this.constraint({
            rule: (str) => str === str.toLowerCase(),
            reason: reason ?? 'The string must be in lowercase'
        });
        return this;
    }

    public matches(regex: RegExp, reason?: string): this {
        this.constraint({
            rule: (str) => regex.test(str),
            reason: reason ?? `The string must match the regex ${regex}`
        });
        return this;
    }

    public max(max: number, reason?: string): this {
        this.constraint({
            rule: (str) => str.length <= max,
            reason:
                reason ?? `The string must be at most ${max} characters long`
        });
        return this;
    }

    public min(min: number, reason?: string): this {
        this.constraint({
            rule: (str) => str.length >= min,
            reason:
                reason ?? `The string must be at least ${min} characters long`
        });
        return this;
    }

    public notEmpty(reason?: string): this {
        this.constraint({
            rule: (str) => str.length > 0,
            reason: reason ?? 'The string must not be empty'
        });
        return this;
    }

    public numeric(reason?: string): this {
        this.constraint({
            rule: (str) => /^[0-9]+$/.test(str),
            reason: reason ?? 'The string must contain only numeric characters'
        });
        return this;
    }

    public startsWith(prefix: string, reason?: string): this {
        this.constraint({
            rule: (str) => str.startsWith(prefix),
            reason: reason ?? `The string must start with ${prefix}`
        });
        return this;
    }

    public uppercase(reason?: string): this {
        this.constraint({
            rule: (str) => str === str.toUpperCase(),
            reason: reason ?? 'The string must be in uppercase'
        });
        return this;
    }

    public url(reason?: string): this {
        this.constraint({
            rule: (str) => /^(http|https):\/\/[^ "]+$/.test(str),
            reason: reason ?? 'The string must be a valid URL'
        });
        return this;
    }

    public uuid(reason?: string): this {
        this.constraint({
            rule: (str) =>
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
                    str
                ),
            reason: reason ?? 'The string must be a valid UUID'
        });
        return this;
    }
}
