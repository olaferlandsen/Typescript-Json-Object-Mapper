# (TypeScript) Json-Object-Mapper
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HEF7696BDQTDG)

This a simple package to mapping a json object.


## Getting Started
### Install
```bash
npm install --save typescript-json-object-mapper
```
### Create you own Views
This an exaple with sub-views and recursive work.

```typescript
class WheelsView extends JsonView {
    @JsonProperty({name: 'id',type: 'string'}) index: number;
    @JsonProperty vendor: string;
    @JsonProperty size: number;
    @JsonProperty timestamp: Date;
}
class CarView extends JsonView {
    @JsonProperty name: string;
    @JsonProperty vendor: string;
    @JsonProperty model: string;
    @JsonProperty engine: string;
    @JsonProperty traction: string;
    @JsonProperty({view: [WheelsView]}) wheels: WheelsView[];
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
    ]
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
      "id": "0"
    },
    {
      "vendor": "firestone",
      "size": 26,
      "timestamp": "1970-01-18T18:31:05.061Z",
      "id": "1"
    },
    {
      "vendor": "pirelli",
      "size": 26,
      "timestamp": "2018-08-28T17:03:56.000Z",
      "id": "2"
    },
    {
      "vendor": "pirelli",
      "size": 10,
      "timestamp": "2018-08-28T17:03:56.000Z",
      "id": "3"
    }
  ]
}
```

## To Do
* [x] Recursive support
* [x] No-Initiation support
* [x] Renaming support
* [x] Convert types support
* [x] Annotation support
* [ ] Format support
* [ ] Enum support
* [ ] Validator support
