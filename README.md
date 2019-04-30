# (TypeScript) Json-Object-Mapper
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HEF7696BDQTDG)

This a simple package to mapping a json object.


## Getting Started
### Install
```bash
npm install typescript-json-object-mapper
```
```bash
yarn add typescript-json-object-mapper
```
### Configure
To work with decorators, you need first enable `emitDecoratorMetadata` y `experimentalDecorators` on you `tsconfig.json`.
Example:
```json
{
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        ...
    }
    ...
}
```
### Create you own Views
This example tries to show all possible cases in which you might need to use this utility.

```typescript
class UserView extends JsonView {
    @JsonProperty
    username: string;
    
    @JsonProperty
    @JsonIgnore
    password: string;
}
```

### Define you data object
```typescript
const json = {
    username: "annon",
    password: "12345678",
    birthday: new Date()
};
```
### Serilize
```typescript
const serialized = JsonObjectMapper.serialize(json, UserView).toString();
```

### Result
```json
{
    "username": "annon"
}
```

## Features
* [x] No-Initiation(Using only reference to class)
* [x] Renaming properties
* [x] Change data types
    * [x] to Date
        * [x] from String using `Date.parse`
        * [x] from Integer using `Date`
    * [x] to Integer
        * [x] from String using `Number`
    * [x] to Float
        * [x] from String using `Number`
    * [x] to Boolean
    * [x] to String
    * [x] to Object
* [x] Sub-Views(Recursivity)
    * [x] Array sub-views
    * [x] Single sub-view
* [x] Date values(String, Number, Date)
* [x] Serialize from `Object Array`
* [x] Serialize from `Object`
* [x] Serialize from `String`
* [ ] Property Topic

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
