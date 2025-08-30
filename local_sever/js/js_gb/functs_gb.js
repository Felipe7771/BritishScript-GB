const data = require("./data_gb");
import {Slave, Coin} from "./types_gb";

function new_var(name, type, data_type="int",value=null, noble=false, alias_var=""){
    switch(type){
        case "slave":
            new_slave(name,value,noble);
            break
        case "coin":
            new_coin(name,value,data_type,noble);
            break;
        case "alias":
            new_alias(name, alias_var);

    }
}

function obj(name){
    return data.vars[name];
}

function new_slave(name, value=null, noble=false,){
    data.vars[name] = new Slave(name,value,noble)

    return {result: true,
        message: ``,
        content: ""};
}

function new_coin(name, value=null, data_type=null, noble=false){
    data.vars[name] = new Coin(name,value,data_type,noble)

    return {result: true,
            message: ``,
            content: ""};
}

function new_alias(name, alias_var){

    data.vars[name] = obj(alias_var);
    return {result: true,
        message: ``,
        content: ""};
}

module.exports = {
    new_alias,
    new_coin,
    new_slave,
    obj,
    new_var
}

