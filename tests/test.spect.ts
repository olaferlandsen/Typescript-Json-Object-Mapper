import "mocha";
import { JsonObjectMapper, JsonProperty, JsonView } from '../src';
import { JsonIgnore } from '../src/core/metadata/JsonIgnore';


class PersonView extends JsonView {
    @JsonIgnore
    id: number;

    @JsonProperty
    name: string;

    @JsonProperty
    active: boolean;
}
class WheelsView extends JsonView {
    @JsonProperty({
        name: 'id',
        type: 'string'
    })
    public index: number;
    @JsonProperty
    public vendor: string;
    @JsonProperty({
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    })
    public size: number;

    @JsonProperty
    public timestamp: Date;
}
class CarView extends JsonView {
    @JsonProperty
    public name: string;
    @JsonProperty
    public vendor: string;
    @JsonProperty
    public model: string;
    @JsonProperty
    public engine: string;
    @JsonProperty
    public traction: string;
    @JsonProperty({
        view: [WheelsView]
    })
    public wheels: WheelsView[];

    @JsonProperty(PersonView)
    public driver: PersonView;
}


const json =  {
    name: "cautito",
    vendor: "citroen",
    model: "lira",
    engine: "v8",
    traction: "4x4",
    wheels: [
        {
            index: 0,
            vendor: "pirelli",
            size: 26,
            timestamp: new Date()
        },
        {
            index: 1,
            vendor: "firestone",
            size: 26,
            timestamp: 1535465061

        },
        {
            index: 2,
            vendor: "pirelli",
            size: 26,
            timestamp: "Tue, 28 Aug 2018 17:03:56 GMT"
        },
        {
            index: 3,
            vendor: "pirelli",
            size: 10,
            timestamp: "Tue, 28 Aug 2018 17:03:56 GMT"
        }
    ],
    driver: {
        id: 1,
        name: "Pedro",
        active: true
    }
};
let x = JsonObjectMapper.serialize(json, CarView).toJson();
console.log(x);

/*
describe("Trying", () => {
    let json: any = {};
    it("Creating object", () => {
        ;
    });
    it ("Serialize CarView object", () => {
        console.log(JsonObjectMapper.serialize(json, CarView).toString(4));
    });
});
*/
