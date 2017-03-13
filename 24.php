<?php

if(count($argv) < 5) die('参数不足');
array_shift($argv);

$result = permutation($argv);

$result = getExpression($result);
$result = array_unique($result);

$out = [];
foreach ($result as $v)
{
    $str = "return {$v};";
    $result = @eval($str);
    if(round($result, 8) == 24) $out[] = substr($str, 7);
}
print_r($out);
die;

/**
 * 表达式
 * @param array $data
 * @return array
 */
function getExpression($data)
{
    $count = count($data[0]);
    for($i=1; $i<$count; $i++)
    {
        $result = [];
        foreach ($data as $id=>&$v)
        {
            $tmp = $v;
            unset($tmp[0], $tmp[1]);
            $result[] = array_merge(["({$v[0]}+{$v[1]})"], $tmp);
            $result[] = array_merge(["({$v[0]}-{$v[1]})"], $tmp);
            $result[] = array_merge(["({$v[1]}-{$v[0]})"], $tmp);
            $result[] = array_merge(["({$v[0]}*{$v[1]})"], $tmp);
            $result[] = array_merge(["({$v[0]}/{$v[1]})"], $tmp);
            $result[] = array_merge(["({$v[1]}/{$v[0]})"], $tmp);
            unset($data[$id]);
        }
        $data = $result;
    }
    return array_map('current', $data);
}

/**
 * 排列
 * @param $arr
 * @return array
 */
function permutation($arr)
{
    $count = count($arr);
    if($count==1)
    {
        return [$arr];
    }
    else
    {
        $result = [];
        foreach($arr as $id=>&$v)
        {
            $temp = $arr;
            $now = $temp[$id];
            unset($temp[$id]);
            $result1 = permutation($temp);
            foreach($result1 as $vv)
            {
                array_unshift($vv, $now);
                $result[] = $vv;
            }
        }
        return $result;
    }
}
