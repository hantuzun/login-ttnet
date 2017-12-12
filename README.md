# Login TTNet on macOS
> Aren't you sick of this?

## Dependencies 

```sh
brew install phantomjs
brew install casperjs
```


## Try 

Log out of TTNet and run the following command in this directory:

```sh
casperjs login_ttnet.js --username=<username> --password=<password>
```

## Run this every minute


### Create `com.hantuzun.login_ttnet.plist`
Replace the program arguments with your parameters and create the following file: 

`com.hantuzun.login_ttnet.plist`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.hantuzun.login_ttnet</string>
    
    <key>EnvironmentVariables</key>
    <dict>
        <key>PHANTOMJS_EXECUTABLE</key>
        <string>{The phantomjs binary path found in `ls -la $(which phantomjs)`}</string>
    </dict>

    <key>ProgramArguments</key>
    <array>
        <string>{The casperjs binary path found in `ls -la $(which casperjs)`}</string>
        <string>{The path of your login_ttnet.js}</string>
        <string>--username={Your TTNet Username}</string>
        <string>--password={Your TTNet Password}</string>
    </array>

    <key>StartInterval</key>
    <integer>60</integer>

    <key>StandardErrorPath</key>
    <string>/var/log/com.hantuzun.login_ttnet.log</string>
    <key>StandardOutPath</key>
    <string>/var/log/com.hantuzun.login_ttnet.log</string>
</dict>
</plist>
```

### Copy the task into your LaunchDaemons folder

We should keep this task in a reliable directory. The recommended place for periodic tasks is `/Library/LaunchDaemons`:

```sh
sudo cp com.hantuzun.login_ttnet.plist /Library/LaunchDaemons
```


### Load the task

Now we need to install this task with `launchd`:

```sh
launchctl load -w /Library/LaunchDaemons/com.hantuzun.login_ttnet.plist
```

Confirm that the task is loaded with `launchctl list`:

```sh
launchctl list | grep login_ttnet
```
