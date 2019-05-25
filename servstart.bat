@echo off

REM -- i really wish i didn't have to use a batch file for this --

echo %programfiles(x86)%>pf86
set /p pf86=<pf86
del pf86
if "%pf86%"=="ECHO is off." goto x86

REM -- on x64 --
echo 64-bit
call "%programfiles(x86)%\nodejs\nodevars.bat"
goto prog

:x86
REM -- on x86 --
echo 32-bit
call "%programfiles%\nodejs\nodevars.bat"
goto prog

:prog
npm start
goto:eof