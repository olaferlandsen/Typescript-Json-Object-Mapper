import { JsonObjectMapper, JsonView, JsonProperty, JsonIgnore, Serialization } from "../src";
import { expect } from 'chai';

class CarView extends JsonView {
    @JsonProperty
    username: string;

    @JsonIgnore
    password: string;

    @JsonProperty
    @JsonIgnore
    token: string;

    @JsonIgnore
    @JsonProperty
    phone: string;

    @JsonProperty({
        ignore: true
    })
    device: string;

    @JsonProperty({
        type: 'string'
    })
    birthday: Date;

    @JsonProperty({
        type: 'date',
        name: 'timestamp'
    })
    unixTimestamp: number;

    @JsonProperty({type: "number"})
    level: string;
}
const json: any = {
    username: "annon",
    password: "12345678",
    birthday: new Date(),
    unixTimestamp: 1556645157,
    level: "2",
    token: "1q2w3e4r5t6y7u8i9o0p",
    device: "12233333"
};
let serialized: Serialization;
let saj: any;
let sas: string;

describe("Testing all features of TypeScript Json Object Mapper", () => {
    it("Serialize initialization", () => {
        serialized = JsonObjectMapper.serialize(json, CarView);
        expect(serialized).to.be.an('object');
    });
    it("Serialize to String", () => {
        sas = serialized.toString();
        expect(sas).to.be.an('string');
    });
    it("Serialize to JSON", () => {
        saj = serialized.toJson();
        expect(saj).to.be.an('object');
    });
    it("Apply @JsonIgnore on property password", () => expect(saj).not.property('password'));
    it("Change dataType on property 'birthday' from 'Date' to 'string'", () => expect(saj.birthday).to.be.an('string'));
    it("Rename property 'unixTimestamp' to 'timestamp'", () => {
        expect(saj.birthday).not.property('unixTimestamp');
        expect(saj.birthday).not.property('timestamp');
    });
    it("Change dataType on property 'timestamp' from 'number' to 'Date'", () => expect(saj.timestamp).to.be.an('Date'));
    it("Change property DataType from 'string' to 'number'", () => expect(saj.level).to.be.an('number'));
    it("Combine @JsonProperty and @JsonIgnore over property 'token'", () => expect(saj).not.property('token'));
    it("Combine @JsonIgnore and @JsonProperty over property 'phone'", () => expect(saj).not.property('phone'));
    it("Using @JsonProperty({ignore: true}) on property 'device'", () => expect(saj).not.property('device'));
});
