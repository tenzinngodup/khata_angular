"use strict";angular.module("khataAngularApp",["ngFacebook","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngFileUpload"]).config(["$routeProvider","$locationProvider","$facebookProvider","USER_ROLES",function(a,b,c,d){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/word/:wordId",{templateUrl:"views/word.html",controller:"WordCtrl",controllerAs:"word"}).when("/grammer",{templateUrl:"views/grammer.html"}).when("/community",{templateUrl:"views/community.html"}).when("/names",{templateUrl:"views/names.html"}).when("/colloquial",{templateUrl:"views/colloquial.html"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"contact"}).when("/addWord",{templateUrl:"views/addword.html",controller:"AddwordCtrl",controllerAs:"addWord",data:{authorizedRoles:[d.admin,d.editor]}}).when("/forum",{templateUrl:"forum/index.php"}).when("/copyright",{templateUrl:"views/copyright.html"}).when("/honorific",{templateUrl:"views/honorific.html",controller:"HonorificCtrl",controllerAs:"honorific"}).when("/explore",{templateUrl:"views/explore.html",controller:"ExploreCtrl",controllerAs:"explore"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/user",{templateUrl:"views/user.html",controller:"UserCtrl",controllerAs:"user",data:{authorizedRoles:[d.admin,d.editor]}}).otherwise({redirectTo:"/"}),c.setAppId("1495326877435490")}]).run(["$rootScope",function(a){!function(){if(!document.getElementById("facebook-jssdk")){var a=document.getElementsByTagName("script")[0],b=document.createElement("script");b.id="facebook-jssdk",b.src="//connect.facebook.net/en_US/all.js",a.parentNode.insertBefore(b,a)}}()}]).run(["$rootScope","AUTH_EVENTS","AuthService",function(a,b,c){a.$on("$routeChangeStart",function(d,e){var f=e.data.authorizedRoles;c.isAuthorized(f)||(d.preventDefault(),c.isAuthenticated()?a.$broadcast(b.notAuthorized):a.$broadcast(b.notAuthenticated))})}]),angular.module("khataAngularApp").constant("API","http://localhost:1337/").constant("AUTH_EVENTS",{loginSuccess:"auth-login-success",loginFailed:"auth-login-failed",logoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}).constant("USER_ROLES",{all:"*",admin:"admin",editor:"editor",guest:"guest"}),angular.module("khataAngularApp").controller("MainCtrl",["$scope","$http","API","CommonService",function(a,b,c,d){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.likecount=0,a.dislikecount=0,a.styleChange=function(){a.searchEntered="top-left"},a.imageChange=function(){var b=Math.floor(9*Math.random()),c=["images/girl_tibet.a816452e.jpg","images/Potala.98c707c5.jpg","images/tibet-horseman.72638ff8.jpg","images/Tibet_Everest.56a6efb3.jpg","images/scripture.0b6432a0.jpg","images/Compassion.bf0b90f9.jpg","images/miyul.4507d6f2.jpg","images/omani-script.a14c8c24.jpg","images/nyingje.f5334db3.jpg"];a.imageLocation=c[b]},a.imageChange(),a.searchEntered=!1,a.searchText=function(){return null===a.searchword?(a.noSearchFound=!0,!1):(a.noSearchFound=!1,a.$parent.bodyStyle="{}",b({method:"GET",url:c+"word?where={word:{contains:"+a.searchword+"}}"}).success(function(b){a.searchEntered=!0,("No Result"===b||0===b.length)&&(a.noSearchFound=!0),a.wordlist=b}).error(function(b){a.codeStatus=b||"Request failed"}),!1)},a.cancel=function(b){a.wordlist[b].cancelling=!0},a.like=function(b,c){return a.cancel(c),a.wordlist[c].like=parseInt(a.wordlist[c].like)+1,d.postLike(b).success(function(a){}).error(function(b){a.codeStatus=b||"Request failed"}),!1},a.dislike=function(b,c){return a.cancel(c),a.wordlist[c].dislike=parseInt(a.wordlist[c].dislike)+1,d.postDislike(b).success(function(a){}).error(function(b){a.codeStatus=b||"Request failed"}),!1},a.count=function(){return b({method:"GET",url:c+"count.php",headers:{"Content-Type":"application/json"}}).success(function(b){b[0]["COUNT( * )"];a.countvalue=b[0]["COUNT( * )"]}).error(function(b){a.codeStatus=b||"Request failed"}),!1},a.speak=function(a){var b=/[^(]*/.exec(a);responsiveVoice.speak(b[0])},a.init=function(){d.getMostliked10().success(function(b){a.mostliked=b}).error(function(b){a.codeStatus=b||"Request failed"}),d.getRecent10().success(function(b){a.recent=b}).error(function(b){a.codeStatus=b||"Request failed"})},a.init()}]),angular.module("khataAngularApp").controller("AboutCtrl",["$scope","$http","API",function(a,b,c){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.alerts={success:!1,message:"Null"},a.createWord=function(){var d=a.word;b.post(c+"create.php",d).success(function(){a.alerts={success:!0,message:"Awesome! Your word has been submitted!"}})}}]),angular.module("khataAngularApp").controller("WordCtrl",["$routeParams","$scope","$http","API",function(a,b,c,d){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];({id:a.wordId});c.get(d+"word/"+a.wordId).success(function(a){b.word=a}),b.cancel=function(){b.word.cancelling=!0},b.speak=function(a){var b=/[^(]*/.exec(a);responsiveVoice.speak(b[0])},b.like=function(a){return b.cancel(),b.word.like=parseInt(b.word.like)+1,c({method:"POST",url:d+"like.php",headers:{"Content-Type":"application/json"},data:{id:a}}).success(function(a){console.log(a)}).error(function(a){b.codeStatus=a||"Request failed"}),!1},b.dislike=function(a){return b.cancel(),b.word.dislike=parseInt(b.word.dislike)+1,c({method:"POST",url:d+"dislike.php",headers:{"Content-Type":"application/json"},data:{id:a}}).success(function(a){console.log(a)}).error(function(a){b.codeStatus=a||"Request failed"}),!1}}]),angular.module("khataAngularApp").controller("ContactCtrl",["$scope","$http","API",function(a,b,c){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.alerts={success:!1,message:"Null"},a.contactSubmit=function(){var c=a.contact;b.post("http://khata.co/api/contact.php",c).success(function(){a.alerts={success:!0,message:"Awesome! Your feedback has been submitted!"}}).error(function(){a.alerts={failure:!0,message:"Error submiting request!"}})}}]),angular.module("khataAngularApp").controller("AddwordCtrl",["$scope","$http","Upload","API","$window",function(a,b,c,d,e){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.alerts={success:!1,message:"Null"},a.createWord=function(){var c="http://localhost:1337/word";b.post(c,{data:a.word,access_token:e.sessionStorage.token,headers:{"Content-Type":"application/json",Authorization:"Bearer "+e.sessionStorage.token}}).success(function(b){console.log(b),a.wordlist.push(a.word),a.alerts={success:!0,message:"Awesome! Your word has been submitted!"}})}}]),angular.module("khataAngularApp").controller("BodyCtrl",["$scope","USER_ROLES","AuthService","AUTH_EVENTS","$location","$rootScope","$window",function(a,b,c,d,e,f,g){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.currentUser=null,a.userRoles=b,a.isAuthorized=c.isAuthorized,a.setCurrentUser=function(b){a.currentUser=b},a.$on(d.notAuthenticated,function(){alert("not notAuthenticated"),e.path("/login")}),a.$on(d.notAuthorized,function(){alert("not notAuthorized"),e.path("/login")}),a.isAuthenticated=function(){return c.isAuthenticated()},a.logout=function(){f.$broadcast(d.notAuthenticated),g.location.reload()}}]),angular.module("khataAngularApp").controller("HonorificCtrl",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("khataAngularApp").controller("ExploreCtrl",["$scope","$http","API","CommonService",function(a,b,c,d){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.totalItems=64,a.currentPage=4,a.refresh=function(){d.getExplore().then(function(b){a.words=b.data})},a.init=function(){d.getExplore().then(function(b){a.words=b.data}),d.getMostliked10().success(function(b){a.mostliked=b}).error(function(b){a.codeStatus=b||"Request failed"}),d.getRecent10().success(function(b){a.recent=b}).error(function(b){a.codeStatus=b||"Request failed"})},a.init()}]),angular.module("khataAngularApp").service("CommonService",["$http","API",function(a,b){return{getExplore:function(){return a({method:"GET",url:b+"word?limit=10",headers:{"Content-Type":"application/json"}}).success(function(a){return a}).error(function(a){return a})},getMostliked10:function(){return a({method:"GET",url:b+"word?sort=like DESC&limit=10",headers:{"Content-Type":"application/json"}}).success(function(a){return a}).error(function(a){return a})},getRecent10:function(){return a({method:"GET",url:b+"word?sort=createdAt DESC&limit=10",headers:{"Content-Type":"application/json"}}).success(function(a){return a}).error(function(a){return a})},postLike:function(c){return a({method:"POST",url:b+"like.php",headers:{"Content-Type":"application/json"},data:{id:c}}).success(function(a){return a}).error(function(a){return a})},postDislike:function(c){return a({method:"POST",url:b+"dislike.php",headers:{"Content-Type":"application/json"},data:{id:c}}).success(function(a){return a}).error(function(a){return a})}}}]),angular.module("khataAngularApp").controller("LoginCtrl",["$facebook","$scope","$location","$window","$http","AUTH_EVENTS","AuthService","Session","$rootScope",function(a,b,c,d,e,f,g,h,i){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],b.loginFacebook=function(){a.login(["email"]).then(function(a){d.sessionStorage.token=a.authResponse.accessToken,console.log(d.sessionStorage.token),i.$broadcast(f.loginSuccess),b.me()},function(a){i.$broadcast(f.loginFailed),console.log("Error!",a)})},b.me=function(){a.api("/me",{fields:"id, name, email"}).then(function(a){h.create(d.sessionStorage.token,a.id,"editor",a.name),b.setCurrentUser(h),c.path("/user")})}}]),angular.module("khataAngularApp").factory("AuthService",["$http","Session",function(a,b){var c={};return c.login=function(c){return a.post(API+"/login/facebook",c).then(function(a){return b.create(a.data.id,a.data.user.id,a.data.user.role),a.data.user})},c.isAuthenticated=function(){return!!b.userId},c.isAuthorized=function(a){return angular.isArray(a)||(a=[a]),c.isAuthenticated()&&-1!==a.indexOf(b.userRole)},c}]),angular.module("khataAngularApp").controller("UserCtrl",["$scope","$window","Session","$http","API",function(a,b,c,d,e){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=a.currentUser,d.get(e+"user?facebookId="+a.currentUser.userId).success(function(b){console.log(b),d.get(e+"word?author="+b[0].id).success(function(b){console.log(b.length),a.totalWord=b.length})})}]),angular.module("khataAngularApp").service("Session",function(){this.create=function(a,b,c,d){this.id=a,this.userId=b,this.userRole=c,this.userDisplayName=d},this.destroy=function(){this.id=null,this.userId=null,this.userRole=null,this.userDisplayName=null}}),angular.module("khataAngularApp").run(["$templateCache",function(a){a.put("views/about.html",'<p class="container"> <h3>About Us: </h3> <i>Khata is developed by the LobJong team, a group of Tibetans founded in 2015, motivated to empower Tibetans through knowledge & innovation. </i> <br> <br> <blockquote align="justify"> Khata.co is a crowdsourced Tibetan dictionary created by the Lobjong Team. Through active engagement within our community on what Tibetan words should be created and added, and by fostering a wider comprehension of these words, we can improve our ability to communicate clearly to each other about the world we inhabit. The Tibetan language is complex given the different dialects, formalities, and rapidly changing times. Many new words are introduced as we accommodate to the different realities around us. Khata is an easy-to-use web/app based resource that allows any user to add words along with their meanings. Ranking of definitions is ordered by number of likes/dislikes. Khata’s success depends largely on collaborative community engagement. </blockquote> Interested and want to volunteer? <a href="http://khata.co/#/contact">Contact us</a>, as we are seeking translators/ Individual contributors. </p>'),a.put("views/addword.html",'{{StatusMessage}} <br><br> <div class="alert alert-success" ng-show="alerts.success"> <strong>SUCCESS!</strong> <div>{{alerts.message}}</div> </div> <form name="userForm" ng-submit="createWord();" novalidate> <div class="form-group"> Tibetan Word: (<a href="https://www.youtube.com/watch?v=q_fSLK2lQwc">Wylie keyboard</a>) <input type="text" class="form-control" name="word" ng-model="word.word" placeholder="བོད་ཡིག་" required> <span style="color:red" ng-show="userForm.word.$invalid"> <span ng-show="userForm.word.$error.required">Word is required.</span> </span> </div> <div class="form-group"> Tibetan Definition:(<a href="https://www.youtube.com/watch?v=q_fSLK2lQwc">Wylie keyboard</a>) <textarea type="text" rows="2" class="form-control" name="definition" ng-model="word.definition" placeholder="བོད་ཡིག་གོ་དོན་"></textarea> </div> <div class="form-group"> English Word: Pronounciation in parenthesis is recommended.<input type="text" class="form-control" name="english_word" placeholder="English" ng-model="word.english_word" required> <span style="color:red" ng-show="userForm.english_word.$invalid"> <span ng-show="userForm.english_word.$error.required">English Word is required.</span> </span> </div> <div class="form-group"> English Definition: <textarea type="text" class="form-control" name="english_definition" placeholder="English Definition" rows="2" ng-model="word.english_definition"></textarea> </div> <!--         <button class="btn btn-success" ng-click=\'createWord()\'>Create</button>\n --> <input type="submit" class="btn btn-success" ng-disabled="userForm.word.$invalid || userForm.english_word.$invalid"> </form> <br><br> <p><b> <a name="Win7">How To Install Tibetan Language in Windows 8</a><br> <video width="700" height="400" controls> <source src="http://res2.windows.microsoft.com/resbox/en/windows/main/7cdc40b9-94e5-43b8-a9c2-b65f6a2d1526_7.ogv" type="video/ogg"> Your browser does not support the video tag. </source></video><br> To get Tibetan Keyboard: Choose Tibetan(PRC) Keyboard from the List. &nbsp;</b></p> <p><b> <a name="Win7">How To Install Tibetan Language in Mac </a><br> <iframe width="700" height="400" src="https://www.youtube.com/embed/q_fSLK2lQwc" frameborder="0" allowfullscreen></iframe> &nbsp;</b></p>'),a.put("views/colloquial.html","<!-- <p>This is the colloquial view.</p>\n\nColloquial Tibetan -->Coming Soon!"),a.put("views/community.html",'<!-- <p><h2>Coming Soon! </h2></p>\n --> <div class="container"> <iframe src="http://www.forum.khata.co" height="100%" width="100%" onload="this.width=screen.width;this.height=screen.height"></iframe> </div>'),a.put("views/contact.html",'{{StatusMessage}} <br><br> <div class="alert alert-success" ng-show="alerts.success"> <strong>SUCCESS!</strong> <div>{{alerts.message}}</div> </div> <div class="alert alert-danger" ng-show="alerts.failure"> <strong>Error!</strong> <div>{{alerts.message}}</div> </div> <!-- \n    Tibetan Word:\n      <input type="text" ng-model="word.word"> <br>\n    Tibetan Definition: \n      <input type="text" ng-model="word.definition"> <br> \n     English Word:\n      <input type="text" ng-model="word.english_word" > <br>\n     English Definition: \n      <input type="text" ng-model="word.english_definition" > <br> \n      <button class="btn btn-success" ng-click=\'createWord()\'>Create</button>\n    <hr> --> <form name="userForm" ng-submit="contactSubmit();" novalidate> <div class="form-group" ng-class="{ \'has-error\': userForm.name.$invalid }"> Name: <input type="text" class="form-control" name="name" ng-model="contact.name" required> </div> <div class="form-group" ng-class="{ \'has-error\': userForm.email_phone.$invalid }"> Email/Phone: <input type="text" class="form-control" name="email_phone" ng-model="contact.email_phone" required> </div> <div class="form-group" ng-class="{ \'has-error\': userForm.feedback.$invalid }"> Feedback : <textarea type="text" class="form-control" name="feedback" ng-model="contact.feedback" rows="3" required></textarea> </div> <!--         <button class="btn btn-success" ng-click=\'createWord()\'>Create</button>\n --> <input type="submit" class="btn btn-success" ng-disabled="userForm.$invalid"> </form> <br><br> Interested in Issues or Future enhancements? <a href="https://trello.com/b/lvXTqpmE/khata-tib-dictionary">Link here</a>'),a.put("views/copyright.html","<p>Copyright notice - <br> This app and its content is copyright of lobjong - © lobjong 2015. All rights reserved. Any redistribution or reproduction of part or all of the contents in any form is prohibited other than the following: you may print or download to a local hard disk extracts for your personal and non-commercial use only you may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material You may not, except with our express written permission, distribute or commercially exploit the content. Nor may you transmit it or store it in any other website or other form of electronic retrieval system.</p>"),a.put("views/explore.html",'<div class="row"> <div class="col-md-8"> <table class="table table-striped"> <thead> <tr> <th>Word </th> <th>Definition</th> </tr> </thead> <tr ng-repeat="x in words"> <td><a href="#/word/{{x.id}}">{{ x.word }} / {{x.english_word}} </a> <!-- <input ng-click=\'speak(x.english_word)\' type=\'button\' value=\'🔊 English\' />\n          <mark>English<span class="glyphicon glyphicon-volume-up" ng-click=\'speak(x.english_word)\'  aria-hidden="true"></span></mark> --> <button type="button" class="btn btn-warning btn-xs" ng-click="speak(x.english_word)"> <span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span> English </button><br> Author:{{x.author.displayName}} <img ng-src="http://graph.facebook.com/{{x.author.facebookId}}/picture"> </td> <td>{{ x.definition }} / {{x.english_definition}}<br> <button type="button" id="{{x.id}}" class="btn btn-default" aria-label="Left Align" ng-click="like(x.id,$index)" ng-disabled="x.cancelling"> {{ x.like}} <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"> </span> </button> <button type="button" id="{{x.id}}" class="btn btn-default" aria-label="Left Align" ng-click="dislike(x.id,$index)" ng-disabled="x.cancelling"> {{ x.dislike }} <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> </button> </td> </tr> </table> <button type="button" class="btn btn-primary align-right" ng-click="refresh()">Next </button> </div> <div class="col-md-4"> <div style="border-style: solid; padding: 4px"> <b>Recently Added </b> <ul class="list-group"> <li class="list-group-item" ng-repeat="x in recent | limitTo:5"> <a href="#/word/{{x.id}}"> {{x.word}}:{{x.english_word}} </a> <sub> Created at: <font size="1">{{x.createdAt}}</font></sub> </li> </ul> </div> <br> <div style="border-style: solid; padding: 4px"> <b> Most Liked Words </b> <ul class="list-group"> <li class="list-group-item" ng-repeat="x in mostliked | limitTo:5"> <a href="#/word/{{x.id}}"> {{x.word}}:{{x.english_word}} </a> <span class="badge">{{x.like}}</span> </li> </ul> </div> </div> </div>'),a.put("views/grammer.html",'<h2>Tibetan བོད་ཡིག་ </h2> <p> Tibetan is a Sino-Tibetan language spoken by about 6 million people in Tibet (Tibet, Qinghai, Gansu, Sichuan and Yunnan), India, Bhutan, Sikkim, Ladakh and Nepal. In Mongolia Tibetan is considered the Classical language of Buddhism and was widely taught until quite recently. <br><br> Before 1949-50, Tibet comprised of three provinces: Amdo, now split between the Qinghai, Gansu and Sichuan provinces; Kham, now largely incorporated into the provinces of Sichuan, Yunnan and Qinghai, and U-Tsang, which, together with western Kham, is now known as the Tibet Autonomous Region, which was created in 1965. <br><br> During the 7th Century AD Songstem Gampo [སྲོང་བཙན་སྒམ་པོ་] (569-649AD), the 33rd king of the Yarlung Dynasty of southern Tibet and the first Emperor of Tibet, sent Thonmi Sambhota, one of his ministers, to India to gather information on Buddhism. The minister then reputedly devised a script for Tibetan based on the Devanagari model and also wrote a grammar of Tibetan based on Sanskrit grammars. <br><br> The new Tibetan alphabet was used to write Tibetan translations of Buddhists texts. The first Sanskrit-Tibetan dictionary, Mahavyutpatti, appeared in the 9th century. Wood block printing, introduced from China, was used in Tibet from an early date and is still used in a few monasteries. <br><br> Tibetan literature is mainly concerned with Buddhist themes and includes works translated from Sanskrit and Chinese and original Tibetan works. There are also literary works about the Bon religion, a pre-Buddhist religion indigenous to Tibet. The most unusual genre of Tibetan literature is that of gter-ma (གཏེར་མ་) or \'rediscovered\' texts - reputedly the work of ancient masters which have been hidden in remote caves for many centuries. <br> <br> <h2>Notable features </h2> Type of writing system: syllabic alphabet or abugida. Each letter has an inherent vowel /a/. Other vowels can be indicated using a variety of diacritics which appear above or below the main letter. <br> Direction of writing: left to right in horizontal lines. <br> Syllables are separated by a dot. <br> Consonant clusters are written with special conjunct letters. <br> </p> <h2>The Tibetan alphabet</h2> <br> The form of the alphabet shown below, known as u-chen (དབུ་ཅན་) is used for printing. Cursive versions of the alphabet, such as the gyuk yig or \'flowing script\' (རྒྱུག་ཡིག་) are used for informal writing. <br> <h3> Consonants </h3><br> <img src="images/tibetan_cons.f61bcad7.gif"> <br><br> <h3>Vowel diacritics</h3> <br> <img src="images/tibetan_vwl.c5ad3be7.gif"> <br><br> <h3>Numerals</h3><br> <img src="images/tibetan_num.2834ace4.gif"> <br><br> <h3>Conjunct consonants</h3><br> <img src="images/tibetan_cnj.959c47f4.gif">'),a.put("views/honorific.html",'<h2>ཞེ་སའི་རྣམ་འབྱེད། Honorific Tibetan</h2> <div class="input-group"> <span class="input-group-addon" id="basic-addon1">Term</span> <input type="text" class="form-control" placeholder="Search Term" aria-describedby="basic-addon1"> </div> <table class="table"> <tr> <th>Formal Term </th> <th>Informal Term </th> <th>English definition </th> </tr> <!-- 	<tr ng-repeat="word in words  | filter: searchKeyword ">\n		<td>\n		</td>\n		<td>\n		</td>\n		<td>\n		</td>\n	</tr> --> </table> <pre>\n\n ཁོང་།	ཁོའམ་།	མོ་།	He or She\nཁོང་གི་	ཁོ་ཡི་	མོ་ཡི་	His or Her	\nཁོང་ལ་	ཁོ་ལ་	མོ་ལ་	Him or She\nཁིང་ཚོ་	ཁོ་ཚོ་		They\nཁོང་ཚོར་	ཁོ་ཚོར་		To them\nཁོང་ཚོའི་	ཁོ་ཚོའི་		Their\nཁོང་རང་	ཁོ་རང་	མོ་རང་	Himself or herself\nཁྱེད་	ཁྱོད་		You(Singular)\nཁྱེད་རྣམ་པ་	ཁྱོད་ཚོ་		You(Plural)\nའཁྲུངས་པ་	སྐྱེས་པ་		Born. To take birth\nའཁྲུངས་སྐར་	སྐྱེས་པའི་ཉིན་མོ་		Birthday\nའཁྲུངས་ས་	སྐྱེ་ས་		Birthplace\nའཁྲུངས་ས་བསྐྱོན་པ་	ཆང་ས་བརྒྱབས་པ་	To wed. To marry\n\n\nའཁྲུངས་རབས་	སྐྱེས་རབས་	Biography. Life story\nའཁྲུངས་རྟགས་	སྐྱེས་རྟགས་	A statue or thanka for rebirth\nའཁྲུངས་་རྟཊ་བཞེངས་པ་	སྐྱེས་རྟཊ་བཟོས་པ་	To make such a thanka\nདགུང་ལོ་	ལོ་		Age\nདགུང་ལོ་བགྲེས་པོ་	ལོ་རྒན་པོ་	Old age	\nདགུང་ལོ་ཆུང་ཆུང་		ལོ་ཆུང་ཆུང་	Young age\nདགུང་ཟླ་	ན་ཟླ་		Equal age. Same age\nདགུང་གྲངས་		ལོ་གྲངས་	Age. \nདགོངས་པ་(n)		བསྨ་བློ་	Thought. Feeling\nདགོངས་པ་(v)		བསམ་པ་	To think\nདགོངས་པ་ཁྲེལ་བ་		ཚིག་པ་ཟ་བ་	    To get angry. To mind\nདགོངས་པ་མ་ཁྲེལ་རོཊ་གནང་	ཚིག་པ་མ་ཟ་རོཊ་	Please don’t mind	\nདགོངས་ས་འགྲེལ་		འགྲེལ་པ་	   Explanation of a text\nདགོངས་པ་བཀྲལ་པ་		འགྲེལ་བཤད་བརྒྱབས་པ་		To Explain a text\nདགོངས་པ་ཚོམ་པ་		རླུང་ལངས་པ་		To think. To consider\nདགོངས་པ་བཤེགས་པ་		ཤི་བ་		To die. Expire\nདགོངས་པ་རྗོགས་པ་		ཤི་བ་		To die. Expire\nདགོངས་གཞི་			བསམ་བློའི་འཆར་གཞི་	Opinion. Plan in mind. \nདགོངས་བཞེད་		སེམས་ཀྱི་འདོད་པ་		Thought. Opinion. \nདགོངས་མཐུན་པ་		བསམ་བློ་མཐུན་པ་		Like Minded. Same Opinion. \nདགོངས་སུ་གསོལ་		བསམ་བློ་ཐོངས་		Please think. \nདགོངས་འཇད་གནང་བ་		སེམས་པ་པཞག་པ་		To remember. To keep in mind. \nདགོངས་དག་		ཚིག་པ་མ་ཟ་		Please forgive. Sorry. \n\n\nམགུལ་	སྐེ་		Neck Throat\nམགུལ་རྒྱན་	སྐེ་ཡི་རྒྱན་		Necklace. Ornament\nམགུལ་གློ་	གློ་		Cough\nམགུལ་གླུ་	གླུ་		Song\nམགུལ་གླུ་བཞེས་པ་	གླུ་བླངས་པ་		To sing. Sang\nམགུལ་ཆམ་		གློ་ཆམ་		Flu. Cold\nམགུལ་ཆམ་བཞེས་པ་	གློ་ཆམ་ཐེབས་པ་	To catch Cold\nམགུལ་ཆིངས་	སྐེ་ཆིངས་		Neck tie. \nམགུལ་དར་		ཁ་བཏགས་		Scarf. Khata\nགྲོངས་པ་		ཤི་བ་		Expire. To die.\nགྲོངས་ཁར་		ཤི་ཁར་		At the time of the death\nཆབ་		ཆུ་		Water\nཆབ་བསྐོལ་		ཆུ་བསྐོལ་		Boiled water\n\n\n\n</pre>'),a.put("views/login.html",'<button type="button" class="btn btn-primary btn-large" data-ng-click="loginFacebook()">Login with Facebook</button>'),a.put("views/main.html",'<!-- \n<div class="alert alert-danger" ng-show="browserAlert">\n  <strong>Message!</strong> Please Use Chrome, IE or Safari browser.\n</div> --> <img ng-hide="searchEntered" src="{{imageLocation}}" alt="Mountain View" align="middle" style="width:600px;height:150px; margin-top: 1cm; margin-left: 5cm"><br><br> <div ng-class="searchEntered ? \'top-left\' : \'centered\'"> <form name="userForm"> <div class="form-group" ng-class="searchEntered ? \'.searchwrap-centered\': \'searchwrap-top-left\' "> <label> <input style="font-size: 18px" placeholder="Type in search word/ འཚོལ་ཞིབ། " ng-model="searchword" typeahead="word.word as word.word for word in autoGetWord($viewValue)" class="form-control" typeahead-template-url="views/wordsearch-tpl.html" type="text" typeahead-editable="true" ng-change="styleChange()" id="searchbox"> </label> <button class="btn btn-success" id="searchbutton" ng-click="searchText()">Search</button> </div> <div ng-hide="searchEntered"> <a ng-href="https://www.facebook.com/khata01/"><i class="fa fa-facebook-official fa-4x"></i></a> <div class="btn pull-right"> <a href="https://itunes.apple.com/us/app/id1063167800"><img src="images/app-store-badge.c0060c54.png" alt="Mountain View" align="middle" height="42" width="110"></a> <a href="https://play.google.com/store/apps/details?id=com.ionicframework.newversionkhata432445&hl=en"><img src="images/googleplay-app-store.c2fcca9c.png" alt="Mountain View" align="middle" height="42" width="110"> </a> </div> </div> </form> <!--     <div class="form-group has-feedback" >\n     <input placeholder="Type in search word/ འཚོལ་ཞིབ་: " ng-model="searchword" typeahead="word.word as word.word for word in autoGetWord($viewValue)" class="form-control"  typeahead-template-url="views/wordsearch-tpl.html" \n      typeahead-editable="true" ng-change="styleChange()" id="searchbox">\n           <i class="glyphicon glyphicon-search form-control-feedback"></i>\n  </div> --> <!--   <div ng-init="count()" class="btn pull-right"><sup>  Total Words: {{countvalue}} </sup></div>\n --> <div class="row" ng-show="searchEntered && !noSearchFound "> <div class="col-md-8"> <table class="table table-striped"> <thead> <tr> <th>Word </th> <th>Definition</th> </tr> </thead> <tr ng-repeat="x in wordlist"> <td><a href="#/word/{{x.id}}">{{ x.word }} / {{x.english_word}} </a> <button type="button" class="btn btn-warning btn-xs" ng-click="speak(x.english_word)"> <span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span> English </button><br> Author:{{x.author.displayName}} <img ng-src="http://graph.facebook.com/{{x.author.facebookId}}/picture"> </td> <td>{{ x.definition }} / {{x.english_definition}}<br> <button type="button" id="{{x.id}}" class="btn btn-default" aria-label="Left Align" ng-click="like(x.id,$index)" ng-disabled="x.cancelling"> {{ x.like}} <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"> </span> </button> <button type="button" id="{{x.id}}" class="btn btn-default" aria-label="Left Align" ng-click="dislike(x.id,$index)" ng-disabled="x.cancelling"> {{ x.dislike }} <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> </button> </td> </tr> </table> </div> <div class="col-md-4"> <div style="border-style: solid; padding: 4px"> <b>Recently Added </b> <ul class="list-group"> <li class="list-group-item" ng-repeat="x in recent | limitTo:5"> <a href="#/word/{{x.id}}"> {{x.word}}:{{x.english_word}} </a> <sub> Created at: <font size="1">{{x.createdAt}}</font></sub> </li> </ul> </div> <br> <div style="border-style: solid; padding: 4px"> <b> Most Liked Words </b> <ul class="list-group"> <li class="list-group-item" ng-repeat="x in mostliked | limitTo:5"> <a href="#/word/{{x.id}}"> {{x.word}}:{{x.english_word}} </a> <span class="badge">{{x.like}}</span> </li> </ul> </div> </div> </div> <div ng-show="noSearchFound"> <h3>No search result found :( </h3> <br> Would you like to add the word? <a ng-href="#/addWord">Add a Word </a> </div> </div> '),a.put("views/names.html",'<table border="1" cellpadding="4" cellspacing="3" frame="above" rules="groups"> <thead> <tr valign="TOP"> <th>Name</th> <th>Pronunciation*</th> <th>Meaning</th> </tr> </thead> <tbody> <tr valign="TOP"> <td>Chodak</td> <td>CHÖ-dahk</td> <td>Dharma Spreader</td> </tr> <tr valign="TOP"> <td>Choden</td> <td>CHÖ-den</td> <td>One who is devout, religious</td> </tr> <tr valign="TOP"> <td>Choegyal</td> <td>CHÖ-gyel</td> <td>Dharma king</td> </tr> <tr valign="TOP"> <td>Choejor</td> <td>CHÖ-jor</td> <td>Spiritual wealth</td> </tr> <tr valign="TOP"> <td>Chophel</td> <td>CHÖ-pel</td> <td>The flourishing of the Dharma</td> </tr> <tr valign="TOP"> <td>Dawa</td> <td>DAH-wah</td> <td>Moon, Monday</td> </tr> <tr valign="TOP"> <td>Dhargey</td> <td>DAR-gyeh</td> <td>Progress, development, spreading</td> </tr> <tr valign="TOP"> <td>Dorje</td> <td>DOR-jeh</td> <td>Vajra (<i>Skt.</i><span style="font-style: normal">)</span>, something indestructible that can cut through anything, often equated with "diamond" or "thunderbolt"</td> </tr> <tr valign="TOP"> <td>Duga</td> <td>DOO-gah</td> <td>&nbsp;</td> </tr> <tr valign="TOP"> <td>Gyaltsen</td> <td>GYEL-tsen</td> <td>Victory Banner</td> </tr> <tr valign="TOP"> <td>Jampa</td> <td>JAHM-pah</td> <td>Loving-kindness (Tibetan name for the Buddha Maitreya)</td> </tr> <tr valign="TOP"> <td>Jamyang</td> <td>JAHM-yahng</td> <td>Gentle voice (Tibetan name for the Bodhisattva Manjushri)</td> </tr> <tr valign="TOP"> <td>Jinpa</td> <td>JIN-pah</td> <td>Generosity (one of the Six Perfections)</td> </tr> <tr valign="TOP"> <td>Jungney</td> <td>JOONG-nay</td> <td>Source, origin</td> </tr> <tr valign="TOP"> <td>Kalsang</td> <td>KEL-sahng</td> <td>Good fortune</td> </tr> <tr valign="TOP"> <td>Karma</td> <td>KAR-mah</td> <td>Action, deed</td> </tr> <tr valign="TOP"> <td>Kunchen</td> <td>KÜN-chen</td> <td>All-knowing</td> </tr> <tr valign="TOP"> <td>Lhundup</td> <td>HLÜN-d(r)oop</td> <td>Spontaneously accomplished</td> </tr> <tr valign="TOP"> <td>Lobsang</td> <td>LO-sahng</td> <td>Noble-minded</td> </tr> <tr valign="TOP"> <td>Ngawang</td> <td>NGAH-wahng</td> <td>Powerful speech</td> </tr> <tr valign="TOP"> <td>Ngodup</td> <td>NGÖ-d(r)oop</td> <td>Attainment, accomplishment</td> </tr> <tr valign="TOP"> <td>Norbu</td> <td>NOR-boo</td> <td>Jewel</td> </tr> <tr valign="TOP"> <td>Palden</td> <td>PEL-den</td> <td>Glorious</td> </tr> <tr valign="TOP"> <td>Pema</td> <td>PEH-mah</td> <td>Lotus</td> </tr> <tr valign="TOP"> <td>Phuntsok</td> <td>PÜN-tsok</td> <td>Excellence</td> </tr> <tr valign="TOP"> <td>Rabten</td> <td>RAHB-ten</td> <td>Steadfast</td> </tr> <tr valign="TOP"> <td>Rinchen</td> <td>RIN-chen</td> <td>Precious, gem (lit: great value)</td> </tr> <tr valign="TOP"> <td>Samdup</td> <td>SAHM-d(r)oop</td> <td>Fulfillment (of one\'s wishes)</td> </tr> <tr valign="TOP"> <td>Sangye</td> <td>SAHN-gyeh</td> <td>Buddha</td> </tr> <tr valign="TOP"> <td>Sonam</td> <td>SÖ-nahm</td> <td>Merit</td> </tr> <tr valign="TOP"> <td>Tashi</td> <td>TAH-shee</td> <td>Auspicious, fortunate</td> </tr> <tr valign="TOP"> <td>Tenzin</td> <td>TEN-zin</td> <td>Holder of the teachings</td> </tr> <tr valign="TOP"> <td>Thekchen</td> <td>TEK-chen</td> <td>Mahayana</td> </tr> <tr valign="TOP"> <td>Thokmay</td> <td>TOK-meh</td> <td>Unobstructed, unhindered</td> </tr> <tr valign="TOP"> <td>Thubten</td> <td>TOOB-ten</td> <td>The Buddha\'s teaching</td> </tr> <tr valign="TOP"> <td>Tinley</td> <td>T(R)IN-leh</td> <td>Enlightened activity</td> </tr> <tr valign="TOP"> <td>Tsering</td> <td>TSEH-ring</td> <td>Long life</td> </tr> <tr valign="TOP"> <td>Tseten</td> <td>TSEH-ten</td> <td>Stable life</td> </tr> <tr valign="TOP"> <td>Tsewang</td> <td>TSEH-wahng</td> <td>Life empowerment</td> </tr> <tr valign="TOP"> <td>Wangchuk</td> <td nowrap>WAHNG-chook</td> <td>Lord, mighty</td> </tr> <tr valign="TOP"> <td>Wangdak</td> <td>WAHNG-dahk</td> <td>&nbsp;</td> </tr> <tr valign="TOP"> <td>Wangdue</td> <td>WAHNG-doo</td> <td>Subduer</td> </tr> <tr valign="TOP"> <td>Yama</td> <td>YAH-mah</td> </tr> <tr valign="TOP"> <td>Yonten</td> <td>YÖN-ten</td> <td>Good qualities</td> </tr> </tbody> </table>'),
a.put("views/user.html",'<div ng-if="currentUser">Welcome, {{ currentUser.name }}</div> <!--     <img ng-src="profileURL" />--> <img ng-src="http://graph.facebook.com/{{currentUser.userId}}/picture"> <div ng-if="currentUser">Welcome, {{ currentUser.userDisplayName }}</div> <div ng-if="isAuthorized(userRoles.admin)">You\'re admin.</div> <div ng-switch on="currentUser.role"> <div ng-switch-when="userRoles.admin">You\'re admin.</div> <div ng-switch-when="userRoles.editor">You\'re editor.</div> <div ng-switch-default>You\'re something else.</div> </div> <h2> Words Contributed: {{totalWord}} </h2>'),a.put("views/word.html",'<p><h1>{{word.word}}</h1></p> Author:{{word.author.displayName}} <img ng-src="http://graph.facebook.com/{{word.author.facebookId}}/picture"><br> Created On:{{word.createdAt}} <br> Updated On:{{word.updatedAt}} <br> <div class="btn pull-right"> <button type="button" id="{{x.id}}" class="btn btn-default" aria-label="Left Align" ng-click="like(word.id)" ng-disabled="word.cancelling"> {{ word.like }} <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> </button> <button type="button" id="{{word.id}}" class="btn btn-default" aria-label="Left Align" ng-click="dislike(word.id)" ng-disabled="word.cancelling"> {{ word.dislike }} <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> </button> </div> <br> <p> <h3 style="color:#B40404">{{word.english_word}}</h3> <button type="button" class="btn btn-warning btn-xs" ng-click="speak(word.english_word)"> <span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span>English </button> </p> <br><br><br> <p><h3>{{word.definition}}</h3></p> <p><h3>{{word.english_definition}} </h3></p> <!-- <img src="http://khata.co/images/{{word.image_location}}" alt="Description"/>\n -->'),a.put("views/wordsearch-tpl.html",'<a><div> <span style="display:block" class="registration" bind-html-unsafe="match.model.word | typeaheadHighlight:query"></span> &middot; <span bind-html-unsafe="match.model.english_word | typeaheadHighlight:query"></span> </div></a>')}]);