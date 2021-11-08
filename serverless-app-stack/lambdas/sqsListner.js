"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const child_process_1 = require("child_process");
const axios = require('axios').default;
exports.handler = async (event, context) => {
    console.log("Event===>", JSON.stringify(event, null, 2));
    await new Promise((resolve, reject) => {
        event.cmd && child_process_1.exec(event.cmd || 'pwd', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`\nstdout==>: ${stdout}\n`);
            resolve(true);
        });
    });
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    // .then(({ data }) => { console.log("Axios_data", JSON.stringify(data, null, 2)) })
    // .catch((err) => { console.log("Axios Error", err) })
    console.log("Axios_data", JSON.stringify(data, null, 2));
    return event;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzTGlzdG5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNxc0xpc3RuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQXFDO0FBQ3JDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFMUIsUUFBQSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUU1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLElBQUksb0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxLQUFLLEVBQUU7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLE9BQU87YUFBRTtZQUM5RCxJQUFJLE1BQU0sRUFBRTtnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFBQyxPQUFPO2FBQUU7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsOENBQThDLENBQUMsQ0FBQTtJQUNoRixvRkFBb0Y7SUFDcEYsdURBQXVEO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXhELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4ge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiRXZlbnQ9PT0+XCIsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSk7XHJcblxyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LmNtZCAmJiBleGVjKGV2ZW50LmNtZCB8fCAncHdkJywgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHsgY29uc29sZS5sb2coYGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoc3RkZXJyKSB7IGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApOyByZXR1cm47IH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFxcbnN0ZG91dD09PjogJHtzdGRvdXR9XFxuYCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMScpXHJcbiAgICAvLyAudGhlbigoeyBkYXRhIH0pID0+IHsgY29uc29sZS5sb2coXCJBeGlvc19kYXRhXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKSB9KVxyXG4gICAgLy8gLmNhdGNoKChlcnIpID0+IHsgY29uc29sZS5sb2coXCJBeGlvcyBFcnJvclwiLCBlcnIpIH0pXHJcbiAgICBjb25zb2xlLmxvZyhcIkF4aW9zX2RhdGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpXHJcblxyXG4gICAgcmV0dXJuIGV2ZW50O1xyXG59OyJdfQ==