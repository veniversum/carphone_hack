function filter(name, op, val) {
        this.name = name;
        this.op = op;
        this.val = val;
}
//Unary filter
function ufilter(name, op, val) {
        this.name = name;
        this.op = op;
}
function boolOR (f1, f2) {
        this.or = [f1, f2]
}

function query() {
    this.filters = new Array();
    this.order_by = [{"field":"Price", "direction":"desc"}];
    this.addFilter = function(name, op, val) {
        this.filters.push(new filter(name,op,val));  
    }
    this.addFilterU = function(name, op, val) {
        this.filters.push(new filter(name,op,val));  
    }
}

function productQuery() {
    this.q = new query();
    
    //LIST OF FILTERS BELOW
    //DO NOT CALL IF VALUE DOESNT MATTER (i.e. both bluetooth yes/no)
    
    //brand
    this.brand = function(brand) {
        this.q.addFilter("Brand", "like", "%" + brand + "%");
    }
    //min price
    this.minPrice = function(price) {
        this.q.addFilter("Price", ">=", price);
    }
    //max price
    this.maxPrice = function(price) {
        this.q.addFilter("Price", "<=", price);
    }
    //storage types: SSD, HDD, eMMC
    this.storageType = function(type) {
        this.q.addFilter("Storage", "like", "%" + type + "%");
    }
    //supports AC true/false
    this.wirelessNew = function(bool) {
        this.q.addFilter("Wireless", bool?"like":"not_like", "%a%c%");
    }
    //whether bluetooth is supported
    this.bluetooth = function(bool) {
        this.q.addFilterU("Bluetooth", bool?"is_not_null":"is_null");
    }
    //has touchscreen true/false
    this.touchscreen = function(bool) {
        this.q.addFilter("Touchscreen", bool?"like":"not_like", "%touch%");
    }
    //if true limit weight to <=1.5kg
    this.lightweight = function(bool) {
        if (bool) this.q.addFilter("Weight", "<=", "1.5 kg");
    }
    //min horizontal resolution, 1920 for fullHD, 2560 for qHD
    this.minResolution = function(hRes) {
        this.q.addFilter("Resolution", ">=", hRes);  
    }
    //min RAM 4GB or 8GB or 12GB, put NUMBER ONLY
    this.minRAM = function(gb) {
        if (gb >= 4)
            this.q.addFilter("Memory", "not_like", "2 GB%");
        if (gb >= 8)
            this.q.addFilter("Memory", "not_like", "4 GB%");  
        if (gb >= 12)
            this.q.addFilter("Memory", "not_like", "8 GB%");
    }
    //if true get laptops with >10h battery life
    this.longBattery = function(bool) {
        if (bool) this.q.addFilter("Battery_life", "like", "% 1_ %");
    }
    //whether it has dedicated gpu
    this.dedicatedGPU = function(bool) {
        this.q.addFilterU("GPU", bool?"is_not_null":"is_null");
    }
    
    //min cpubenchmark
    this.minCPUbenchmark = function(num) {
        this.q.addFilter("cpubenchmark", ">=", num);
    }
    //min gpubenchmark
    this.minGPUbenchmark = function(num) {
        this.q.addFilter("gpubenchmark", ">=", num);
    }


    //CALL THIS WITH CALLBACKC TO EXECUTE QUERY ASYNCHRONOUSLY
    this.execute = function(callback) {$.ajax({url :"/api/specs",
                                       type : "get",
                                       data : {q : JSON.stringify(this.q)},
                                       success : callback});
                                      } 
}