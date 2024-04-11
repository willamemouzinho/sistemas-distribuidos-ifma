import net from 'node:net'

// creates the server
const server = net.createServer()

//emitted when server closes ...not emitted until all connections closes.
server.on('close', () => {
	console.log('Server closed !')
})

// emitted when new client connects
server.on('connection', (socket) => {
	//this property shows the number of characters currently buffered to be written. (Number of characters is approximately equal to the number of bytes to be written, but the buffer may contain strings, and the strings are lazily encoded, so the exact number of bytes is not known.)
	//Users who experience large or growing bufferSize should attempt to "throttle" the data flows in their program with pause() and resume().

	console.log(`Buffer size : ${socket.bufferSize}`)

	console.log('---------server details -----------------')

	const address = server.address()
	const port = address.port
	const family = address.family
	const ipaddr = address.address
	console.log(`Server is listening at port${port}`)
	console.log(`Server ip :${ipaddr}`)
	console.log(`Server is IP4/IP6 : ${family}`)

	const lport = socket.localPort
	const laddr = socket.localAddress
	console.log(`Server is listening at LOCAL port${lport}`)
	console.log(`Server LOCAL ip :${laddr}`)

	console.log('------------remote client info --------------')

	const rport = socket.remotePort
	const raddr = socket.remoteAddress
	const rfamily = socket.remoteFamily

	console.log(`REMOTE Socket is listening at port${rport}`)
	console.log(`REMOTE Socket ip :${raddr}`)
	console.log(`REMOTE Socket is IP4/IP6 : ${rfamily}`)

	console.log('--------------------------------------------')
	//const no_of_connections =  server.getConnections(); // sychronous version
	server.getConnections((error, count) => {
		console.log(`Number of concurrent connections to the server : ${count}`)
	})

	socket.setEncoding('utf8')

	socket.setTimeout(800000, () => {
		// called after timeout -> same as socket.on('timeout')
		// it just tells that soket timed out => its ur job to end or destroy the socket.
		// socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
		// whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
		console.log('Socket timed out')
	})

	socket.on('data', (data) => {
		const bread = socket.bytesRead
		const bwrite = socket.bytesWritten
		console.log(`Bytes read : ${bread}`)
		console.log(`Bytes written : ${bwrite}`)
		console.log(`Data sent to server : ${data}`)

		//echo data
		const is_kernel_buffer_full = socket.write(`Data ::${data}`)
		if (is_kernel_buffer_full) {
			console.log(
				'Data was flushed successfully from kernel buffer i.e written successfully!',
			)
		} else {
			socket.pause()
		}
	})

	socket.on('drain', () => {
		console.log('write buffer is empty now .. u can resume the writable stream')
		socket.resume()
	})

	socket.on('error', (error) => {
		console.log(`Error : ${error}`)
	})

	socket.on('timeout', () => {
		console.log('Socket timed out !')
		socket.end('Timed out!')
		// can call socket.destroy() here too.
	})

	socket.on('end', (data) => {
		console.log('Socket ended from other end!')
		console.log(`End data : ${data}`)
	})

	socket.on('close', (error) => {
		const bread = socket.bytesRead
		const bwrite = socket.bytesWritten
		console.log(`Bytes read : ${bread}`)
		console.log(`Bytes written : ${bwrite}`)
		console.log('Socket closed!')
		if (error) {
			console.log('Socket was closed coz of transmission error')
		}
	})

	setTimeout(() => {
		const isdestroyed = socket.destroyed
		console.log(`Socket destroyed:${isdestroyed}`)
		socket.destroy()
	}, 1200000)
})

// emits when any error occurs -> calls closed event immediately after this.
server.on('error', (error) => {
	console.log(`Error: ${error}`)
})

//emits when server is bound with server.listen
server.on('listening', () => {
	console.log('Server is listening!')
})

server.maxConnections = 10

//static port allocation
server.listen(2222)

// for dyanmic port allocation
server.listen(() => {
	const address = server.address()
	const port = address.port
	const family = address.family
	const ipaddr = address.address
	console.log(`Server is listening at port${port}`)
	console.log(`Server ip :${ipaddr}`)
	console.log(`Server is IP4/IP6 : ${family}`)
})

const islistening = server.listening

if (islistening) {
	console.log('Server is listening')
} else {
	console.log('Server is not listening')
}

setTimeout(() => {
	server.close()
}, 5000000)
