# What is this?

This is just a simple password manager for chrome browsers. I can't find any open source password managers that satisfies me. So I'm creating for myself.
If I have time in the future, this project will evolve a cross platform project and will use your own google drive to sync passwords between your devices.

# How to use?
There is no tooltips or explanation on extension itself right now but it's not hard. 

The key it asks is the key that it uses to encrypt your passwords. You should remember it. The main point of this extension is the save your randomly generated passwords
behind an easy to remember password. You can even leave it empty.

In create password screen you can select the requirements of your random password.

Get password button asks you for your key, in case of wrong key it will probably crash since thats how most of the encryption algorithms work. So I just try catched it.
It does nothing in case of wrong key.

After you enter your key, the program automatically fills the password forms in the website if there is any and also writes the password to your clipboard.

Create password action also have the same feature. If there is a password form in the website you're currently creating the password, it automatically fills the form.


# Features
## Available Features
1-) Create random password (obviously)

2-) Set password name with the website name by default

3-) automatically fill the password area in the website if there any

## Planning to add (I don't know when though. I just started this project to better learn node and how extensions work)
1-) Save your settings between your sessions (the only setting available right now is the create password settings though)

2-) Sync your passwords between your devices (obviously, that was the whole point of starting this project)

3-) Probably first one to do, adding tooltips and explanations. There is nearly no text right now. I will probably add localization so I didn't want to add texts so early.

4-) Making likely apps for other platforms, first target is windows desktop.

# How to install?
## Why don't you just download from chrome store?
https://chrome.google.com/webstore/detail/yapm-by-eeren/oiialnbceghgjagojfboaoaihieligae?hl=tr


## (If not) Build yourself
Step 1-) Download code

Step 2-) run npm install to install node modules 
```
npm install
```


step 3-) just build
```
npm run build
```

step 4-) Add to your browser. 

Step 4.1-) Just go your browsers extensions tab and activate Developer mode

Step 4.2-) Add package, Select "dest" folder.

# Images of extension, I guess?

![image](https://user-images.githubusercontent.com/77689346/183841849-ee26d523-4368-45cb-ad3f-b2cf1fe5814c.png)

![image](https://user-images.githubusercontent.com/77689346/183841693-68032688-c752-4134-9aea-0f7127c45266.png)

![image](https://user-images.githubusercontent.com/77689346/183841802-37267736-3893-472e-a0bf-f8a33f957c19.png)

![image](https://user-images.githubusercontent.com/77689346/183841956-9318a0b9-2533-4781-9dad-5fefb0d26cfd.png)

![image](https://user-images.githubusercontent.com/77689346/183842067-1fe4df50-d3fd-44ca-9375-62b72dcd3a50.png)


