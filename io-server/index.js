var app = require('http').createServer()
var io = require('socket.io')(app)

var users = []
let msg_id = 0



io.on('connection', socket => {

  io.emit('users', {
    users: users
  })

  socket.on('login', data => {
    if(users.some((item) => {
      return item.nickName === data.nickName
    })) {
      socket.emit('login', {
        status: 0,
        msg: '用户名已被占用'
      })
    } else {
      users.push({
        nickName: data.nickName,
        id: socket.id,
        enterTime: + new Date()
      })

      socket.nickName = data.nickName

      io.emit('message', {
        type: 'sys',
        text: '小可爱 '+ socket.nickName + ' 进入了房间',
        date: +new Date()
      })

      io.emit('users', {
        users: users
      })

      socket.emit('login', {
        status: 1,
        msg: '登录成功',
        nickName: data.nickName
      })
    }
  })

  socket.on('message', data => {
    let date = +new Date()
    let id = msg_id++
    socket.broadcast.emit('message', {
      ...data,
      type: 'text',
      id,
      date 
    })
    socket.emit('self', {
      ...data,
      type: 'text',
      self: true,
      id,
      date
    })
  })

  socket.on('disconnect', () => {
    let index = users.findIndex(item => item.id === socket.id)

    index >= 0 && users.splice(index, 1)

    io.emit('users', {
      users: users
    })

    if(socket.nickName) {
      io.emit('message', {
        type: 'sys',
        text: '小可爱 '+ socket.nickName + ' 离开了房间',
        date: +new Date()
      })
    }
  })

})

app.listen(3001, () => {
  console.log('WebSocket 启用端口 on *: 3001')
})