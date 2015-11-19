#!/bin/bash

COOKIES=./cookies.txt
JS_SCRIPT=cookies.js
FIRST_DOMAIN='publisher.localhost'
THIRD_DOMAIN='.adsp.localhost'

#
# 2. User accepts all cookies
#
TARGET_URL=http://publisher.localhost/publisher.html
ACTION="user_accepts_all"

## 2.a. 1st party empty, 3rd party empty
cat /dev/null > $COOKIES
SUBACTION="all_is_empty"
ASSERT_SCRIPT="cookies_are_equal.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

## 2.b. 1st party contain device id A, 3rd party empty
cat /dev/null > $COOKIES
SUBACTION="cookie_third_is_empty"
ASSERT_SCRIPT="cookies_are_equal.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

## 2.c. 1st party empty, 3rd party contain device id A
cat /dev/null > $COOKIES
SUBACTION="cookie_first_is_empty"
ASSERT_SCRIPT="cookies_are_equal.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

## 2.d. 1st party contains A, 3rd party contains A
cat /dev/null > $COOKIES
SUBACTION="cookies_contain_same_device_ids"
ASSERT_SCRIPT="cookies_are_equal.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

# 2.e. 1st party contains A, 3rd party contains B
cat /dev/null > $COOKIES
TARGET_URL=http://publisher.localhost/publisher.html
ACTION="user_accepts_all"
SUBACTION="cookies_contain_different_device_ids"
ASSERT_SCRIPT="cookie_first_contains_cookie_third.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"


#
# 3. User accepts only 1st
#
TARGET_URL=http://publisher.localhost/publisher.html
ACTION="user_accepts_only_first"

## 3.a. 1st party empty, 3rd party empty
cat /dev/null > $COOKIES
SUBACTION="all_is_empty"
ASSERT_SCRIPT="cookies_are_different.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

## 3.b. 1st party contain device id A, 3rd party empty
cat /dev/null > $COOKIES
SUBACTION="cookie_third_is_empty"
ASSERT_SCRIPT="cookies_are_different.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

#
# 5. User accepts only 3rd
#
TARGET_URL=http://publisher.localhost/publisher.html
ACTION="user_accepts_only_third"

## 5.a. 1st party empty, 3rd party empty
cat /dev/null > $COOKIES
SUBACTION="all_is_empty"
ASSERT_SCRIPT="cookies_are_different.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"

## 5.c. 1st party empty, 3rd party contain device id A
cat /dev/null > $COOKIES
SUBACTION="cookie_first_is_empty"
ASSERT_SCRIPT="cookies_are_different.js"
phantomjs --cookies-file=$COOKIES $JS_SCRIPT "$TARGET_URL" "$ACTION" "$SUBACTION" "$FIRST_DOMAIN" "$THIRD_DOMAIN" "$ASSERT_SCRIPT"


