import htmlparser from 'htmlparser2';

var parser = new htmlparser.Parser({
    onopentag: name => console.log(name)
}, {decodeEntities: true});
parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
parser.end();
