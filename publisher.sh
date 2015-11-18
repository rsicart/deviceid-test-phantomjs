#!/bin/bash

COOKIES=./cookies.txt
JS_SCRIPT=cookies.js
FIRST_DOMAIN='publisher.localhost'
THIRD_DOMAIN='.adsp.localhost'

#
# 2. User accepts all cookies
#

## 2.a. 1st party empty, 3rd party empty
#cat /dev/null > $COOKIES
#phantomjs --cookies-file=$COOKIES prepare.js "user_accepts_all" "all_is_empty" "$FIRST_DOMAIN" "$THIRD_DOMAIN"
#phantomjs --cookies-file=$COOKIES $JS_SCRIPT http://publisher.localhost/publisher.html
#phantomjs --cookies-file=$COOKIES cookies_are_equal.js $FIRST_DOMAIN $THIRD_DOMAIN
#
## 2.b. 1st party contain device id A, 3rd party empty
#cat /dev/null > $COOKIES
#phantomjs --cookies-file=$COOKIES prepare.js "user_accepts_all" "cookie_third_is_empty" "$FIRST_DOMAIN" "$THIRD_DOMAIN"
#phantomjs --cookies-file=$COOKIES $JS_SCRIPT http://publisher.localhost/publisher.html
#phantomjs --cookies-file=$COOKIES cookies_are_equal.js $FIRST_DOMAIN $THIRD_DOMAIN
#
## 2.c. 1st party empty, 3rd party contain device id A
#cat /dev/null > $COOKIES
#phantomjs --cookies-file=$COOKIES prepare.js "user_accepts_all" "cookie_first_is_empty" "$FIRST_DOMAIN" "$THIRD_DOMAIN"
#phantomjs --cookies-file=$COOKIES $JS_SCRIPT http://publisher.localhost/publisher.html
#phantomjs --cookies-file=$COOKIES cookies_are_equal.js $FIRST_DOMAIN $THIRD_DOMAIN
#
## 2.d. 1st party contains A, 3rd party contains A
#cat /dev/null > $COOKIES
#phantomjs --cookies-file=$COOKIES prepare.js "user_accepts_all" "cookies_contain_same_device_ids" "$FIRST_DOMAIN" "$THIRD_DOMAIN"
#phantomjs --cookies-file=$COOKIES $JS_SCRIPT http://publisher.localhost/publisher.html
#phantomjs --cookies-file=$COOKIES cookies_are_equal.js $FIRST_DOMAIN $THIRD_DOMAIN

# 2.e. 1st party contains A, 3rd party contains B
cat /dev/null > $COOKIES
phantomjs --cookies-file=$COOKIES prepare.js "user_accepts_all" "cookies_contain_different_device_ids" "$FIRST_DOMAIN" "$THIRD_DOMAIN"
echo "after prepare"
cat $COOKIES
phantomjs --cookies-file=$COOKIES $JS_SCRIPT http://publisher.localhost/publisher.html
echo "after cookie"
cat $COOKIES
phantomjs --cookies-file=$COOKIES cookies_are_similar.js $FIRST_DOMAIN $THIRD_DOMAIN
echo "after similar"
cat $COOKIES
