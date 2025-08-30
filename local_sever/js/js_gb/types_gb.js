export class Slave {
    constructor(name, value, noble=false){
        this.name = name;
        this.value = value;
        // noble é a condição para uma variável constante
        this.noble = noble;
    }

    length(){
        return this.value.length;
    }

    concatenate(other_slave, toSaveInSlave = false){

        if (other_slave instanceof coin){

            let concatenated = this.value + String(other_slave.value);

            // Não é possível salvar um valor númerico à uma String, apenas concatenar para exibição
            if (toSaveInSlave){

                return {result: false,
                        message: `Preposterous! A mere slave cannot be trusted to hold a numeric value.`,
                        content: ""};
            }

            // retorna que não ocorreu erro ao processo
            return {result: true, message: "",content: concatenated}

        } 
        else if (other_slave instanceof slave){

            let concatenated = this.value + other_slave.value;

            //Se toSaveInSlave é true, o valor é salvo na variável
            if (toSaveInSlave){

                if(this.noble){
                    return this.NotpermitedUploadSlave();
                } else {
                    this.value = this.value + other_slave.value;
                }
            }

            // retorna que não ocorreu erro ao processo
            return {result: true, message: "",content: concatenated}

        } else{
            let classOfOtherObject = other_slave.constructor.name;
            // retorna que ocorreu erro ao processo
            return {result: false,
                    message: `Preposterous! A Slave variable with a ${classOfOtherObject}? Utter nonsense.`,
                    content: ""};
        }
    }

    NotpermitedUploadSlave(){
        // noble é a condição para uma variável constante
            return {result: false,
                    message: `Inadmissible! The noble variable "${this.name}" is far beyond tampering..`,
                    content: ""};
    }
}

export class Coin {
    constructor(name,value,type,noble){
        this.name = name;
        this.value = value;
        this.type = type;
        this.noble = noble;
    }

    convertToString(){
        return String(this.value);
    }

    operation(other_coin, operador, toSaveInCoin = false){

        if (other_coin instanceof coin){

            let response;

            switch (operador){
                // operador de soma
                case "add":
                    response = this.value + other_coin.value;
                    break
                
                // operador de subtração
                case "subtr":
                    response = this.value - other_coin.value;
                    break

                // operador de subtração
                case "multi":
                    response = this.value * other_coin.value;
                    break

                // operador de subtração
                case "divis":

                    if (other_coin.value === 0){
                        return {result: false,
                                message: `Absurd! Division by base zero is a mathematical atrocity.`,
                                content: ""};
                    }
                    response = this.value / other_coin.value;
                    break
            }

            //Se toSaveInCoin é true, o valor é salvo na variável
            if (toSaveInCoin){
                this.value = response;
            }

            // retorna que não ocorreu erro ao processo
            return {result: true, message: "",content: response}

        } else {
            let classOfOtherObject = other_coin.constructor.name;
            // retorna que ocorreu erro ao processo
            return {result: false,
                    message: `How utterly indecorous! One does not dare operate a Coin variable with a ${classOfOtherObject}.`,
                    content: ""};
        }
    }
}