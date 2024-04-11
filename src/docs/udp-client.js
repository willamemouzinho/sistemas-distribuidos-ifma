import { Buffer } from 'node:buffer'
import dgram from 'node:dgram'

const message = Buffer.from('Some bytes')
const client = dgram.createSocket('udp4')
client.connect(41234, 'localhost', (err) => {
	client.send(message, (err) => {
		client.close()
	})
})

// or

// import dgram from 'node:dgram';
// import { Buffer } from 'node:buffer';

// const buf1 = Buffer.from('Some ');
// const buf2 = Buffer.from('bytes');
// const client = dgram.createSocket('udp4');
// client.send([buf1, buf2], 41234, (err) => {
//   client.close();
// });
