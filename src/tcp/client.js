import net from 'node:net'

//---------------------client----------------------
// creating a custom socket client and connecting it....
const client = new net.Socket()
client.connect({
	port: 2222,
})

client.on('connect', () => {
	console.log('Client: connection established with server')

	console.log('---------client details -----------------')
	const address = client.address()
	const port = address.port
	const family = address.family
	const ipaddr = address.address
	console.log(`Client is listening at port${port}`)
	console.log(`Client ip :${ipaddr}`)
	console.log(`Client is IP4/IP6 : ${family}`)

	// writing data to server
	client.write('hello from client')
})

client.setEncoding('utf8')

client.on('data', (data) => {
	console.log(`Data from server:${data}`)
})

setTimeout(() => {
	client.end('Bye bye server')
}, 5000)
