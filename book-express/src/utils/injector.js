

const catalog = {}

const add = (key, Component) => {
    catalog[key] = Component
}

const findDependencyList = (Component) => {
   
    let str = Component.toString()
    let index = str.indexOf("constructor")
    if (index === -1)
        return []

    str = str.substring(index + 'constructor'.length)
    index = str.indexOf(")")
    str = str.substring(0, index).replace('(', '')
    return str.split(",").map(a => a.trim()).filter(a => a)

}

const _get = (Component) => {
    

    let dependencyNames = findDependencyList(Component) //["a","b"]
    console.log('finding dependencies for ',Component, dependencyNames)

    if(dependencyNames.length===0){
        console.log('creating no-dep component',Component)
        return new Component();
    }
    let args=[]

    console.log('finding dependencies', dependencyNames)
    for(let dependencyName of dependencyNames){
        let dependency= get(dependencyName)
        args.push(dependency)
    }

    console.log('creating ',Component, 'using', args)
    return new Component(...args);


}


const get = (key) => {    
    let Component = catalog[key]
    console.log('finding key ', key, Component)

    if(!Component)
        throw new Error(`No Dependnecy Found for Key: ${key}`)

    return _get(Component)
}

export default{
    add,
    get
}


