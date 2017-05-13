var Record = class Record {
    constructor(activity, start, stop) {
        this.start = start;
        this.stop = stop;
        if(activity) {
            this.activityID = activity.id;
        }
        console.log("Created Record");
    }
    static unserialize(record) {
        var newRecord = new Record(undefined, record.start, record.stop);
        newRecord.activityID = record.activityID;
        return newRecord;
    }
}
var Activity = class Activity {
    constructor(name) {
        this.name = name;
        this.resetState();
        this.records = [];
        this.id = this.constructor.generateRandomID(8);
        console.log("Created Activity");
    }
    static unserialize(activity) {
        var newActivity = new Activity(activity.name);
        newActivity.id = activity.id;
        newActivity.active = activity.active;
        newActivity.unserializeRecords(activity.records);
        return newActivity;
    }
    unserializeRecords(records) {
        this.records = [];
        for (let record of records) {
            this.records.push(Record.unserialize(record));
        }
        return this.records;
    }
    start() {
        if(this.active) return;
        this.startTime = Date.now();
        this.active = true;
    }
    stop() {
        if(!this.active) return;
        this.stopTime = Date.now();
        this.spawnRecord();
        this.resetState();
    }
    resetState() {
        this.startTime = null;
        this.stopTime = null;
        this.active = false;
    }
    reset() {
        this.resetState();
        this.records = []
    }
    changeName(name) {
        this.name = name;
    }
    spawnRecord() {
        var newRecord = new Record(this, this.startTime, this.stopTime);
        this.records.push(newRecord);
    }
    static generateRandomID(length) {
        var min = Math.pow(36,(length-1));
        var max = (Math.pow(36,length))-1;
        return Math.floor(Math.random()*(max-min+1)+min).toString(36);
    }
    get timeUntilNow() {
        if(!this.active) return;
        return Date.now() - this.startTime;
    }
}
var ActivityContainer = class ActivityContainer {
    constructor() {
        this.activities = [];
        console.log("Created ActivityContainer");
    }
    static unserialize(activityContainer) {
        var newActivityContainer = new ActivityContainer();
        newActivityContainer.unserializeActivities(activityContainer.activities);
        return newActivityContainer;
    };
    unserializeActivities(activities) {
        this.activities = [];
        for (let activity of activities) {
            console.log(this);
            this.activities.push(Activity.unserialize(activity));
        }
    };
    addActivity(activity) {
        this.activities.push(activity)
    }
    createActivity(name) {
        var newActivity = new Activity(name);
        this.addActivity(newActivity);
        return newActivity;
    }
}

var cronolyph = {
    Activity: Activity,
    Record: Record,
    ActivityContainer: ActivityContainer
};
// module.exports = cronolyph;
window.cronolyph = cronolyph;
