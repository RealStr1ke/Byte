class ByteHandler {
	constructor (client, {
		directory,
		classToHandle,
		extensions = ['.js'],
	}) {
		this.client = client;
		this.directory = directory;
		this.extensions = extensions;
		this.classToHandle = classToHandle;
	}

	get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    };
	
	getFiles(dir, ext) {
		// console.log(`${this.directory}${dir}/**/*${ext}`);
		return glob.sync(`${this.directory}${dir}/**/*${ext}`);
	};
	
	async loadAll(dir, ext) {
		throw new Error('This handler hasn\'t passed a loadAll() function.')
	}
}