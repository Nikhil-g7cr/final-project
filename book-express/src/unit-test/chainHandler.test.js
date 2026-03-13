import { ChainManager } from "../utils/chainHandler";
import { expect,should } from "chai";

describe('Chain Manager', function(){

    let chainManager;
    it('Should return undefined by default',()=>{
        const manager = new ChainManager()
        expect(manager.execute()).to.equal(undefined)
    })

})