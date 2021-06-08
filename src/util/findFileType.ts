//https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
/*
	return an array of fullpath files with specified extension
*/

import path from 'path';
import fs from 'fs';

/*
	ie) findFileType('../LiteScript',/\.html$/,function(filename){
    console.log('-- found: ',filename);
});
*/
export function findFileType(
    startPath: string,
    filter: RegExp,
    callback: (params: string) => void
) {
    if (!fs.existsSync(startPath)) {
        console.log('no dir ', startPath);
        return;
    }

    fs.readdirSync(startPath).forEach((file) => {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            findFileType(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    });
    /*for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            findFileType(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };*/
}
