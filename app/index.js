import notify from './api/cloud/notify.js';
import append from './api/influx/append.js';
import queryInflux from './api/influx/query.js';
import writeInflux from './api/influx/write.js';
import info from './api/ip/info.js';
import lookup from './api/ip/lookup.js';
import getLastfm from './api/lastfm/get.js';
import post from './api/mikrotik/post.js';
import authMyshows from './api/myshows/auth.js';
import get from './api/myshows/get.js';
import watch from './api/myshows/watch.js';
import auth from './api/next/auth.js';
import dig from './api/next/dig.js';
import list from './api/next/list.js';
import query from './api/next/query.js';
import check from './api/pinger/check.js';
import notifyPinger from './api/pinger/notify.js';
import getSyncthing from './api/syncthing/get.js';
import sendMessage from './api/telegram/sendMessage.js';
import notifyTinkoff from './api/tinkoff/notify.js';
import portfolio from './api/tinkoff/portfolio.js';
import getTmdb from './api/tmdb/get.js';
import convert from './utils/array/convert.js';
import countArray from './utils/array/count.js';
import diff from './utils/date/diff.js';
import now from './utils/date/now.js';
import erase from './utils/folder/erase.js';
import size from './utils/folder/size.js';
import comment from './utils/hosts/comment.js';
import sort from './utils/hosts/sort.js';
import count from './utils/object/count.js';
import ex from './utils/print/ex.js';
import start from './utils/progress/start.js';
import progressUpdate from './utils/progress/update.js';
import delay from './utils/promise/delay.js';
import isLocalIp from './utils/re/isLocalIp.js';
import repoRun from './utils/repo/run.js';
import update from './utils/repo/update.js';
import cache from './utils/request/cache.js';
import curl from './utils/request/curl.js';
import doh from './utils/request/doh.js';
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
export const cloud = {notify};
export const influx = {append, write: writeInflux, query: queryInflux};
export const ip = {info, lookup};
export const lastfm = {get: getLastfm};
export const mikrotik = {post};
export const myshows = {auth: authMyshows, get, watch};
export const next = {auth, query, list, dig};
export const pinger = {check, notify: notifyPinger};
export const syncthing = {get: getSyncthing};
export const telegram = {sendMessage};
export const tinkoff = {portfolio, notify: notifyTinkoff};
export const tmdb = {get: getTmdb};

/**
 * UTILS
 */
export const array = {convert, count: countArray};
export const date = {diff, now};
export const folder = {size, erase};
export const hosts = {comment, sort};
export const object = {count};
export const print = {ex};
export const progress = {start, update: progressUpdate};
export const promise = {delay};
export const re = {isLocalIp};
export const request = {doh, got, curl, cache, queue, save};
export const repo = {run: repoRun, update};
export const shell = {run};
export const string = {split, escape, filenamify};

/**
 * CONST
 */
export {default as ua} from './const/ua.js';
