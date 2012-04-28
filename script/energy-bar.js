﻿/*logic for the energy bar*/

var ENERGYBAR = 
{
    ANIMATION_RATE:5
    ,MAX_LEVEL0:96
    ,MAX_LEVEL1:192
    ,MAX_LEVEL2:288
    ,LEVEL0:0
    ,LEVEL1:1
    ,LEVEL2:2
    ,LEVELMAXED:3
    ,LEVEL0_KEY:"lvl0"
    ,LEVEL1_KEY:"lvl1"
    ,LEVEL2_KEY:"lvl2"
    ,LEVEL0MAXED_KEY:"lvl0Maxed"
    ,LEVEL1MAXED_KEY:"lvl1Maxed"
    ,LEVEL2MAXED_KEY:"lvl2Maxed"

};


var EnergyBar = function(pnlID,team)
{
    this.Amount = 0;
    this.Team = team;
    this.ParentElement = window.document.getElementById(pnlID);
    this.BarElement = null;
    this.Level0Element = null;
    this.Level1Element = null;
    this.Level2Element = null;

    this.Key = ENERGYBAR.LEVEL0_KEY;
    this.StartFrame = 0;
    this.Animations = {};
    this.FrameCount = 0;
    this.CurrentSrc = "";
    this.LastSrc = "";
}
EnergyBar.prototype.GetNextFrameID = function()
{
    return ++this.FrameCount;
}
EnergyBar.prototype.AddAnimation = function(key)
{
    /*use default values for the Animation*/
    this.Animations[key] = new Animation();
    return this.Animations[key];
}

/*initialized the energy bar*/
EnergyBar.prototype.Init = function()
{
    /***************************/
    /*initialize the animations*/
    /***************************/
    var nbFrames = 8;

    var level0 = this.AddAnimation(ENERGYBAR.LEVEL0_KEY);
    level0.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-team-" + this.Team + ".png",nbFrames)

    var level0Maxed = this.AddAnimation(ENERGYBAR.LEVEL0MAXED_KEY);
    level0Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-full-team-" + this.Team + "-1.png",nbFrames)
    level0Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-full-team-" + this.Team + "-2.png",nbFrames)
    level0Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-full-team-" + this.Team + "-3.png",nbFrames)
    level0Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-full-team-" + this.Team + "-4.png",nbFrames)
    level0Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-full-team-" + this.Team + "-3.png",nbFrames)
    level0Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl0-full-team-" + this.Team + "-2.png",nbFrames)

    var level1Maxed = this.AddAnimation(ENERGYBAR.LEVEL1MAXED_KEY);
    level1Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl1-full-team-" + this.Team + "-1.png",nbFrames)
    level1Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl1-full-team-" + this.Team + "-2.png",nbFrames)
    level1Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl1-full-team-" + this.Team + "-3.png",nbFrames)
    level1Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl1-full-team-" + this.Team + "-4.png",nbFrames)
    level1Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl1-full-team-" + this.Team + "-3.png",nbFrames)
    level1Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl1-full-team-" + this.Team + "-2.png",nbFrames)

    var level2Maxed = this.AddAnimation(ENERGYBAR.LEVEL2MAXED_KEY);
    level2Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl2-full-team-" + this.Team + "-1.png",nbFrames)
    level2Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl2-full-team-" + this.Team + "-2.png",nbFrames)
    level2Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl2-full-team-" + this.Team + "-3.png",nbFrames)
    level2Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl2-full-team-" + this.Team + "-4.png",nbFrames)
    level2Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl2-full-team-" + this.Team + "-3.png",nbFrames)
    level2Maxed.AddFrame(this,null,"images/misc/misc/energy-bar-lvl2-full-team-" + this.Team + "-2.png",nbFrames)
    /******************************/
    /*initialize the html elements*/
    /******************************/
    this.BarElement = window.document.createElement("img");
    this.BarElement.className = "energy-bar";

    this.Level0Element = window.document.createElement("div");
    this.Level0Element.className = "level-0-energy";
    this.Level0Element.style.width = "0px";

    this.Level1Element = window.document.createElement("div");
    this.Level1Element.style.width = "0px";
    this.Level1Element.className = "level-1-energy";

    this.Level2Element = window.document.createElement("div");
    this.Level2Element.style.width = "0px";
    this.Level2Element.className = "level-2-energy";

    this.ParentElement.appendChild(this.BarElement);
    this.ParentElement.appendChild(this.Level0Element);
    this.ParentElement.appendChild(this.Level1Element);
    this.ParentElement.appendChild(this.Level2Element);
    /*set the initial values*/
    this.Change(0);
}
/*Resets the energy*/
EnergyBar.prototype.Reset = function()
{
    this.Amount = -this.Amount;
    this.Change(0);
}
/**/
EnergyBar.prototype.SetCurrentAnimation = function(key,frame)
{   
    this.Key = key
    this.StartFrame = frame;
}
/*adds to the energy bar*/
EnergyBar.prototype.Change = function(amount,frame)
{
    amount = amount || 0;
    this.Amount = Math.min(Math.max(this.Amount + amount, 0),ENERGYBAR.MAX_LEVEL2);
    this.HandleAmountChanged(frame || 0);
}
/*css helper*/
EnergyBar.prototype.ShowLevelHelper = function(element,cssDisplay)
{
    if(element.style.display != cssDisplay)
        element.style.display = cssDisplay;
}
/**/
EnergyBar.prototype.ShowEnergyLevelBar = function(level)
{
    switch(level)
    {
        case ENERGYBAR.LEVEL0: { this.ShowLevelHelper(this.Level0Element,"");     this.ShowLevelHelper(this.Level1Element,"none"); this.ShowLevelHelper(this.Level2Element,"none"); break;}
        case ENERGYBAR.LEVEL1: { this.ShowLevelHelper(this.Level0Element,"none"); this.ShowLevelHelper(this.Level1Element,"");     this.ShowLevelHelper(this.Level2Element,"none"); break;}
        case ENERGYBAR.LEVEL2: { this.ShowLevelHelper(this.Level0Element,"none"); this.ShowLevelHelper(this.Level1Element,"none"); this.ShowLevelHelper(this.Level2Element,"");     break;}
        default:               { this.ShowLevelHelper(this.Level0Element,"none"); this.ShowLevelHelper(this.Level1Element,"none"); this.ShowLevelHelper(this.Level2Element,"none"); break;}
    }
}

/**/
EnergyBar.prototype.HandleAmountChanged = function(frame)
{
    this.ShowEnergyLevelBar();
    if(this.Amount < ENERGYBAR.MAX_LEVEL0)
    {
        this.ShowEnergyLevelBar(ENERGYBAR.LEVEL0);
        this.Level0Element.style.width = this.Amount + "px";
        this.SetCurrentAnimation(ENERGYBAR.LEVEL0_KEY,frame);
    }
    else if(this.Amount < ENERGYBAR.MAX_LEVEL1)
    {
        this.ShowEnergyLevelBar(ENERGYBAR.LEVEL1);
        this.Level1Element.style.width = (this.Amount - ENERGYBAR.MAX_LEVEL0) + "px";
        this.SetCurrentAnimation(ENERGYBAR.LEVEL0MAXED_KEY,frame);
    }
    else if(this.Amount < ENERGYBAR.MAX_LEVEL2)
    {
        this.ShowEnergyLevelBar(ENERGYBAR.LEVEL2);
        this.Level2Element.style.width = (this.Amount - ENERGYBAR.MAX_LEVEL1) + "px";
        this.SetCurrentAnimation(ENERGYBAR.LEVEL1MAXED_KEY,frame);
    }
    else if(this.Amount == ENERGYBAR.MAX_LEVEL2)
    {
        this.ShowEnergyLevelBar(ENERGYBAR.LEVELMAXED);
        this.Level2Element.style.width = "0px";
        this.SetCurrentAnimation(ENERGYBAR.LEVEL2MAXED_KEY,frame);
    }
}
/**/
EnergyBar.prototype.FrameMove = function(frame)
{
    var delta = frame - this.StartFrame;
    var currentFrame = this.Animations[this.Key].GetFrame(delta);
    /*these animations are continuous, so if we go past the end, reset*/
    if(!currentFrame)
    {
        this.StartFrame = frame;
        delta = frame - this.StartFrame;
        currentFrame = this.Animations[this.Key].GetFrame(delta);
    }
    if(!!currentFrame)
    {
        if(!!currentFrame.LeftSrc)
        {
            this.CurrentSrc  = currentFrame.LeftSrc;
        }
    }
}
/**/
EnergyBar.prototype.Render = function(frame)
{
    if(this.LastSrc != this.CurrentSrc)
    {
        this.BarElement.src  = frameImages_.Get(this.CurrentSrc).src;
        this.LastSrc = this.CurrentSrc;
    }
}