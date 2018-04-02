 //在线用户socket
 var onlineUsers = {};//{name234234:socket}
 //当前在线人数
 var onlineCount = 0;
 //当前在线用户名
 var onlineUserName = [];

module.exports=function(io){
  //配置
  io.on('connection',(socket)=>{
    
    socket.on('login', (data) => {
      
      //校验
      //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
      socket.name = data.username;

      //检查在线列表，如果不在里面就加入
      if (!onlineUsers.hasOwnProperty(data.username)) {
        // console.log(socket);
        onlineUsers[data.username] = socket;
        onlineUserName.push(data.username);//添加用户名
        //在线人数+1
        onlineCount++;
      }
  
      //向所有客户端广播用户加入
      io.emit('login', {username: data.username, msg: '加入聊天室' });
      //广播在线列表更新
      io.emit('update', { onlineUserName, onlineCount });
    });

    socket.on('disconnect', function () {//监听客户端下线事件
      if (onlineUsers[socket.name]) {
        delete onlineUsers[socket.name]; //删除用户
        onlineUserName.splice(onlineUserName.indexOf(socket.name), 1);//删除用户名
        onlineCount--;//更新在线用户
      }
      io.emit('logout', { username: socket.name, msg: '下线了' });
      io.emit('update', { onlineUserName, onlineCount });
    });

    // 广播消息
    socket.on('message', (data) => {  //监听客户端发来的自定义消息事件，并接受数据data
      data.username = socket.name;//获取到当前客户端的id,和数据
      io.emit('message', data);  //广播消息给所有客户端
    })

    /** 私人消息 */
    socket.on('private message', function (toUserName, data, callback) {
      // console.log(toUserName,data);
      callback('你发消息给' + toUserName + ':' + data.msg);
      data.fromUserName = socket.name;
      onlineUsers[toUserName] && onlineUsers[toUserName].emit('private message', data);
    });


  })
  

}