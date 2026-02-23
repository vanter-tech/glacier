export namespace database {
	
	export class Account {
	    id: number;
	    name: string;
	    type: string;
	    balance_cents: number;
	
	    static createFrom(source: any = {}) {
	        return new Account(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.type = source["type"];
	        this.balance_cents = source["balance_cents"];
	    }
	}

}

