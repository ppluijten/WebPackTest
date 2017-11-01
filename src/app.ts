import { Foo } from "./foo";
import * as foo from "./foo";
import * as moment from "moment";
import './styles.css';
import './styles.scss';
import './styles.less';

console.log(`Count: ${foo.Count}`);
Foo.thisMethod("5");
foo.LogMult(3, 6);
var mult = foo.Multiply(3, 6);
console.log(mult);

var formattedDate = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(formattedDate);