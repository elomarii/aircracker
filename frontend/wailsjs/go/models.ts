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
	export class NetSvc {
	    Name: string;
	    Loaded: boolean;
	    Active: boolean;
	    Status: string;
	    Desc: string;
	
	    static createFrom(source: any = {}) {
	        return new NetSvc(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Loaded = source["Loaded"];
	        this.Active = source["Active"];
	        this.Status = source["Status"];
	        this.Desc = source["Desc"];
	    }
	}

}

