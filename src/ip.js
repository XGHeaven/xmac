'ust strict';

var chunks = [];
process.stdin.on('data', data => chunks.push(data));
process.stdin.on('end', parse);

function parse() {
    console.log(Buffer
    .concat(chunks)
    .toString('utf-8')
    .split(/\n(?!\t)/)
    .map(group => group.split('\n'))
    .map(group => {
        var header = group[0].slice(0, group[0].indexOf(':'));
        var body = group.slice(1)
        .filter(line => ~line.indexOf('inet ') && !~line.indexOf('127.0.0.1'))
        .map(line => line.replace(/0x[0-9a-f]{8}/, string => 
                         string
                         .slice(2)
                         .match(/.{2}/g)
                         .map(number => parseInt(number, 16))
                         .join('.'))
            )
        return [header].concat(body);
    })
    .filter(group => group.length > 1)
    .map(group => group.join('\n'))
    //.filter(line => (line[0] !== '\t' || ~line.indexOf('inet')))
    .join('\n'));
}
