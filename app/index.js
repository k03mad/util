import getAdg from './api/adg/get.js';
import notify from './api/cloud/notify.js';
import append from './api/influx/append.js';
import queryInflux from './api/influx/query.js';
import writeInflux from './api/influx/write.js';
import info from './api/ip/info.js';
import post from './api/mikrotik/post.js';
import check from './api/pinger/check.js';
import notifyPinger from './api/pinger/notify.js';
import sendMessage from './api/telegram/sendMessage.js';
import convert from './utils/array/convert.js';
import countArray from './utils/array/count.js';
import diff from './utils/date/diff.js';
import now from './utils/date/now.js';
import size from './utils/folder/size.js';
import count from './utils/object/count.js';
import ex from './utils/print/ex.js';
import delay from './utils/promise/delay.js';
import isLocalIp from './utils/re/isLocalIp.js';
import repoRun from './utils/repo/run.js';
import update from './utils/repo/update.js';
import cache from './utils/request/cache.js';
import curl from './utils/request/curl.js';
import got from './utils/request/got.js';
import queue from './utils/request/queue.js';
import save from './utils/request/save.js';
import run from './utils/shell/run.js';
import escape from './utils/string/escape.js';
import filenamify from './utils/string/filenamify.js';
import split from './utils/string/split.js';

/**
 * API
 */
export const adg = {get: getAdg};
export const cloud = {notify};
export const influx = {append, write: writeInflux, query: queryInflux};
export const ip = {info};
export const mikrotik = {post};
export const pinger = {check, notify: notifyPinger};
export const telegram = {sendMessage};

/**
 * UTILS
 */
export const array = {convert, count: countArray};
export const date = {diff, now};
export const folder = {size};
export const object = {count};
export const print = {ex};
export const promise = {delay};
export const re = {isLocalIp};
export const request = {got, curl, cache, queue, save};
export const repo = {run: repoRun, update};
export const shell = {run};
export const string = {split, escape, filenamify};
