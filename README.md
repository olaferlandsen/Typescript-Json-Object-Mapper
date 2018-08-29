# (TypeScript) Json-Object-Mapper
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HEF7696BDQTDG)

This a simple package to mapping a json object.


## Getting Started
### Install
```bash
npm install --save typescript-json-object-mapper
```
### Import
```
import { JsonProperty, JsonIgnore, JsonView, JsonObjectMapper } from 'typescript-json-object-mapper';
```

### Create you own Views
This example tries to show all possible cases in which you might need to use this utility.

```typescript
import { JsonProperty, JsonIgnore, JsonView } from 'typescript-json-object-mapper';

class DriverView extends JsonView {
    @JsonProperty
    public id: number;
    @JsonProperty({
        name: "fullname"
    })
    public name: number; // Rename property
    @JsonProperty
    public email: string;
    @JsonIgnore
    public password: string;
}
class WheelsView extends JsonView {
    @JsonProperty({
        type: "string"
    })
    public index: number;// Convert int to string value
    @JsonProperty
    public vendor: string;
    @JsonProperty
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
    @JsonIgnore
    public engine: string; // Ignore property(don't show)
    @JsonProperty
    public traction: string;
    @JsonProperty ([WheelsView])
    public wheels: WheelsView[];// Sub-View Array
    @JsonProperty (DriverView)
    public driver: DriverView;// Sub-View Object
}
```

### Define you data object
```typescript
const json: any = {
    name: "cautito",
    vendor: "citroen",
    model: "lira",
    engine: "v8",
    traction: "4x4",
    wheels: [ // Array of object's
        {
            index: 0,
            vendor: "pirelli",
            size: 26,
            timestamp: new Date() // date as object
        },
        {
            index: 1,
            vendor: "firestone",
            size: 26,
            timestamp: 1535465061 // date as integer
        },
        {
            index: 2,
            vendor: "pirelli",
            size: 26,
            timestamp: "Tue, 28 Aug 2018 17:03:56 GMT" // date as string
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
        name: "John Smith",
        email: "john.smith@example.com",
        password: "12345678"
    }
};
```
### Serilize
```typescript
const serialized = JsonObjectMapper.serialize(json, CarView).toString();
```

### Result
```json
{
    "name": "cautito",
    "vendor": "citroen",
    "model": "lira",
    "engine": "v8",
    "traction": "4x4",
    "wheels": [
        {
            "vendor": "pirelli",
            "size": 26,
            "timestamp": "2018-08-28T18:11:44.204Z",
            "index": "0"
        },
        {
            "vendor": "firestone",
            "size": 26,
            "timestamp": "1970-01-18T18:31:05.061Z",
            "index": "1"
        },
        {
            "vendor": "pirelli",
            "size": 26,
            "timestamp": "2018-08-28T17:03:56.000Z",
            "index": "2"
        },
        {
            "vendor": "pirelli",
            "size": 10,
            "timestamp": "2018-08-28T17:03:56.000Z",
            "index": "3"
        }
    ],
    "driver": {
        "id": "1",
        "fullname": "John Smith",
        "email": "john.smith@example.com"
    }
}
```

## Features
* [x] No-Initiation(Using only reference to class)
* [x] Renaming properties
* [x] Convert data types
    * [x] to Date
        * [x] from String using `Date.parse`
        * [x] from Integer using `Date`
    * [x] to Integer
        * [x] from String using `Number`
    * [x] to Float
        * [x] from String using `Number`
    * [x] to Boolean
* [x] Sub-Views(Recursivity)
    * [x] Array sub-views
    * [x] Single sub-view
* [x] Date values
* [x] Serialize from `Object Array`
* [x] Serialize from `Object`

## ToDo
* [ ] Deserialize
* [ ] Custom Regex validator
* [ ] Custom format value
* [ ] Default values
* [ ] Enum values
    * [ ] String
    * [ ] Number
    * [ ] Boolean


## API:

### JsonObjectMapper.serialize
This function always return `Serialization` object.
And can using it with data as `Array` or `Object`.

##### Example
```typescript
// from Array
JsonObjectMapper.serialize([
    {
        email: "john.smith@example.com",
        password: "123456"
    },
    {
        email: "john.smith@example.com",
        password: "123456"
    },
    {
        email: "john.smith@example.com",
        password: "123456"
    }
], UserView);

// from Object
JsonObjectMapper.serialize({
   email: "john.smith@example.com",
   password: "123456"
}, UserView);
```

### Serialization
#### Serialization.toString(`spaces:number = 4`): `string`
This method return a string representation of object.

#### Serialization.toJson()
This method return a json object representation.
