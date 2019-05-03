import { JsonObjectMapper, JsonView, JsonProperty, Serialization } from "../src";
import { expect } from 'chai';

class CarView extends JsonView {
    @JsonProperty({
        topic: 'system'
    })
    username: string;

    @JsonProperty({
        topic: 'admin',
        ignore: true
    })
    password: string;

    @JsonProperty({
        topic: 'system',
        ignore: true
    })
    token: string;

    @JsonProperty({
        topic: 'owner',
        ignore: true
    })
    phone: string;

    @JsonProperty({
        topic: 'system',
        ignore: true
    })
    device: string;

    @JsonProperty({
        type: 'string',
        topic: 'owner'
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
        console.log("saj", serialized.toJson());

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


    it("Serialized with topic 'system'", () => {
        serialized = JsonObjectMapper.serialize(json, CarView, 'system');
        expect(serialized).to.be.an('object');
    });
    it("Serialized to String with topics", () => {
        sas = serialized.toString();
        expect(sas).to.be.an('string');
    });
    it("Serialized to JSON with topics", () => {
        saj = serialized.toJson();
        expect(saj).to.be.an('object');
    });
    it("Get property of system topic", () => expect(saj).has.property('username'));

    it("Serialized with topics 'system' and 'owner'", () => {
        console.log("json", json)
        serialized = JsonObjectMapper.serialize(json, CarView, ['owner', 'system']);
        console.log("serialized", serialized)

        expect(serialized).to.be.an('object');
    });
    it("Serialized to JSON with topics", () => {
        saj = serialized.toJson();
        expect(saj).to.be.an('object');
    });

    it("Get property 'username' of 'system' topic", () => expect(saj).has.property('username'));
    it("Get property 'birthday' of 'owner' topic", () => expect(saj).has.property('birthday'));

});
