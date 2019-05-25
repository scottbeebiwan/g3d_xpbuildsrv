@echo off
set ocd=%cd%
cd "\Program Files\Microsoft Visual Studio 8\VC"
call "\Program Files\Microsoft Visual Studio 8\VC\vcvarsall.bat" x86
cd %ocd%
cd G3D-Fun
msbuild