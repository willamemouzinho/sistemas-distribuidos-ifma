import net from 'node:net'

//NOTE:--> all the events of the socket are applicable here..in client...

// -----------------creating client using net.connect instead of custom socket-------

// server creation using net.connect --->
// u can also => write the below code in seperate js file
// open new node instance => and run it...

const clients = net.connect({ port: 2222 }, () => {
	// 'connect' listener
	console.log('connected to server!')
	clients.write('world!\r\n')
})
clients.on('data', (data) => {
	console.log(data.toString())
	clients.end()
})
clients.on('end', () => {
	console.log('disconnected from server')
})
