export class Serialization {
    public constructor (private serialized: any) {}
    public toString (space = 4): string {
        return JSON.stringify(this.serialized, null, space);
    }
    public toJson (): object {
        return this.serialized;
    }
}
