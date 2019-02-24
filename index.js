import htmlparser from 'htmlparser2';
import { readFile } from 'fs';
import bluebird from 'bluebird';
import path from 'path';

let fileList = [
	path.join(__dirname, 'samples', 'index.html'),
	path.join(__dirname, 'samples', 'template.html')
];

const readfile = file => new Promise((resolve, reject) => {
	readFile(file, 'utf8', (err, data) => {
		err ? reject(err) : resolve(data);
	});
});

let store = [];

const recParse = trees => {
	trees.forEach(tree => {
		if (tree.name) console.log(tree.name);
		if (
			tree.children && tree.children.length &&
			tree.children.length > 0
		) {
			recParse(tree.children);
		}
	});
};

bluebird.map(fileList.map(readfile), fileData => fileData)
	.then(data => data.map(datum => {
		const parser = new htmlparser.Parser(
			new htmlparser.DomHandler((error, dom) => store.push(dom))
		);
		parser.write(datum);
		parser.end();
	}), err => {
		console.error('Files not found', err);
	})
	.then(() => {
		let tree = store[0];
		recParse(tree);
	});
