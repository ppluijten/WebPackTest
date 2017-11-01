import { Foo } from "./foo";
import * as foo from "./foo";
import * as moment from "moment";
import * as $ from "jquery";
import "./styles.css";
import "./styles.scss";
import "./styles.less";

console.log(`Count: ${foo.Count}`);
Foo.thisMethod("5");
foo.LogMult(3, 6);
var mult: number = foo.Multiply(3, 6);
console.log(mult);

var formattedDate: string = moment().format("MMMM Do YYYY, h:mm:ss a");
console.log(formattedDate);

var x: JQuery = $("body");
x.show();