var createError = require('http-errors');
var express = require('express');
const cors = require("cors")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'uploads')));

const multer  = require('multer');

//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
const upload = multer({ 
    dest: __dirname+'/uploads/', // 이미지 업로드 경로
}) ;

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const fileFields = upload.fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 8 },
]);

app.post('/fields/upload', fileFields, (req, res, next) => {


  const { file1, file2 } = req.files;
  const { name } = req.body;

  console.log("body 데이터 : ", name);

  //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
  file1.map(data => {
      console.log("file1");
      console.log("     ");
      console.log("폼에 정의된 필드명 : ", data.fieldname);
      console.log("사용자가 업로드한 파일 명 : ", data.originalname);
      console.log("파일의 엔코딩 타입 : ", data.encoding);
      console.log("파일의 Mime 타입 : ", data.mimetype);
      console.log("파일이 저장된 폴더 : ", data.destination);
      console.log("destinatin에 저장된 파일 명 : ", data.filename);
      console.log("업로드된 파일의 전체 경로 ", data.path);
      console.log("파일의 바이트(byte 사이즈)", data.size);
  })
  
  console.log("     ");
  console.log("-----------------------------------------------");
  console.log("     ");
  
  //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
  file2.map(data => {
      console.log("file2");
      console.log("     ");
      console.log("폼에 정의된 필드명 : ", data.fieldname);
      console.log("사용자가 업로드한 파일 명 : ", data.originalname);
      console.log("파일의 엔코딩 타입 : ", data.encoding);
      console.log("파일의 Mime 타입 : ", data.mimetype);
      console.log("파일이 저장된 폴더 : ", data.destination);
      console.log("destinatin에 저장된 파일 명 : ", data.filename);
      console.log("업로드된 파일의 전체 경로 ", data.path);
      console.log("파일의 바이트(byte 사이즈)", data.size);
  })

  res.json({ok: true, data: "Fields Upload Ok"})

})


app.post('/single/upload', upload.single('file'), (req, res, next) => {//console.log(req);

  const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
  const { name } = req.body;

  console.log("body 데이터 : ", name);
  console.log("폼에 정의된 필드명 : ", fieldname);
  console.log("사용자가 업로드한 파일 명 : ", originalname);
  console.log("파일의 엔코딩 타입 : ", encoding);
  console.log("파일의 Mime 타입 : ", mimetype);
  console.log("파일이 저장된 폴더 : ", destination);
  console.log("destinatin에 저장된 파일 명 : ", filename);
  console.log("업로드된 파일의 전체 경로 ", path);
  console.log("파일의 바이트(byte 사이즈)", size);

  res.json({ok: true, data: "success", filename: filename})

})

app.post('/multipart/upload', upload.array('file'), (req, res, next) => {

  const { name } = req.body;
  console.log("body 데이터 : ", name);

  //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
  req.files.map(data => {
    console.log("폼에 정의된 필드명 : ", data.fieldname);
    console.log("사용자가 업로드한 파일 명 : ", data.originalname);
    console.log("파일의 엔코딩 타입 : ", data.encoding);
    console.log("파일의 Mime 타입 : ", data.mimetype);
    console.log("파일이 저장된 폴더 : ", data.destination);
    console.log("destinatin에 저장된 파일 명 : ", data.filename);
    console.log("업로드된 파일의 전체 경로 ", data.path);
    console.log("파일의 바이트(byte 사이즈)", data.size);
  })

  res.json({ok: true, data: "Multipart Upload Ok"})

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
