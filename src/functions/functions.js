 function queryFunction1 (query) {
    const capitalizedName= query.toUpperCase()
    const name= capitalizedName[0] + query.slice(1,query.length)
    return name
}

function transformer (res) {
    console.log(res.data.length)
    const result= res.data.map(d => {
        return {name: d.name, temperament: d.temperament, imageUrl: d.image.url,
          weightMetric: d.weight.metric, weightImperial: d.weight.imperial, id: d.id}
      });
      return result;
}


function transformer2 (res) {
    const result= res.map(d => {
        return {
            name: d.name, temperament: d.temperament, imageUrl: d.image.url,
            weightMetric: d.weight.metric, weightImperial: d.weight.imperial, 
            heightMetric: d.height.metric, heightImperial: d.height.imperial,
            lifeSpan: d.life_span
          }
      });
      return result;
}



function filteredTransformer (res) {
    const result= res.map(d => {
        return {name: d.name, temperament: d.temperament, imageUrl: d.image.url,
          weightMetric: d.weight.metric, weightImperial: d.weight.imperial, id: d.id}
      });
      return result;
}



function temperamentsFunction (arr) {
if (typeof arr === 'object') {
var newArr= arr.map(t => {
    if (typeof t === 'string') {
       let j= t.split(',')
       return j;
    }
})
}
var arrTemps= [];
newArr.map(t => {
    if (typeof t === 'object') {
    for (let i = 0; i < t.length; i++) {

        if (t[i][0] === ' ') { 
            j= t[i].replace(' ','') 
            if (!arrTemps.includes(j)) arrTemps.push(j)
        }
        else if (!arrTemps.includes(t[i])) {arrTemps.push(t[i])}
    }
}
})

let res = arrTemps.sort(function(a, b) {
    if(a.toLowerCase() < b.toLowerCase()) { return -1; }
    if(a.toLowerCase() > b.toLowerCase()) { return 1; }
    return 0;
})

return res
}

module.exports = {
             queryFunction1: queryFunction1,
             transformer: transformer,
             filteredTransformer: filteredTransformer,
             transformer2: transformer2,
             temperamentsFunction: temperamentsFunction,
            }