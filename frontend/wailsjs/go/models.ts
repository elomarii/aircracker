export namespace aircracker {
	
	export class Interface {
	    Name: string;
	    Mode: string;
	    Info: string;
	
	    static createFrom(source: any = {}) {
	        return new Interface(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Mode = source["Mode"];
	        this.Info = source["Info"];
	    }
	}

}

