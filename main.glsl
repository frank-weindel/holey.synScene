

float waterWave(float angle) {
  return -(abs(sin(angle)) - 1.);
}

vec4 renderMain(void)
{
  vec2 position = _xy;

  float autoSize = scriptSyn_BPMConfidence * (scriptLimit - uMinSize) * scriptSyn_OnBeat + uMinSize;
  float manualSize = (scriptLimit - uMinSize) * pulse + uMinSize;

  float minRes = min(RENDERSIZE.x, RENDERSIZE.y);
  vec2 st = position / minRes;
  vec2 center = vec2(RENDERSIZE.x / 2.0 / minRes, 0.5);
  float dist = length(st - center);
  vec2 direction = (st - center) / dist;
  float cosineAngle = (direction.x + 1.0) / 2.0;
  float dist2 = length(st - center);
  float RIPPLE_MAGNITUDE = uRippleMagnitude * scriptSyn_BassLevel;
  float RIPPLE_MULTIPLIER = floor(uNumRipples);

  float inside = RIPPLE_MULTIPLIER*acos(direction.x);
  float addon = +scriptSyn_MidHighTime;
  float modifiedCosine = (cos(inside + addon) + 1.0) / 2.0;
  if (st.y < center.y) {
      modifiedCosine = (cos(-inside + addon) + 1.0) / 2.0;
  }

  float SIZE_MULTIPLIER = auto * autoSize + (1.0 - auto) * manualSize;

  float SHAPE_SIZE = SIZE_MULTIPLIER - modifiedCosine * RIPPLE_MAGNITUDE * SIZE_MULTIPLIER;

  float shapeMap = smoothstep(SHAPE_SIZE, SHAPE_SIZE, dist); //dist

  float bgRed = 0.6 + beatFlash * smoothstep(0.6, 1.0, scriptSyn_OnBeat);

  if (shapeMap > 0.0) {
    if (scriptGreen > 0.5) {
      return vec4(0.0, bgRed, 0.0, 1.0);
    } else {
      return vec4(bgRed, 0.0, 0.0, 1.0);
    }
  }

  return vec4(shapeMap, shapeMap, shapeMap, 1.0);
}
