rmdir build /s /q

mkdir build
copy app\index.html build

mkdir build\css
copy app\css\*.css build\css

mkdir build\img
copy app\img\*.png build\img
copy app\img\*.jpg build\img

mkdir build\js
copy app\js\*.js build\js

mkdir build\partials
copy app\partials\*.html build\partials
