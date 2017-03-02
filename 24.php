<?php

if(count($argv) < 5) die('参数不足');
array_shift($argv);

$result = permutation($argv);
$method = ['+', '-', '*', '/'];

$result = getExpression($result, $method);
$result = array_unique($result);

$out = [];
foreach($result as $v)
{
    $str = "return {$v};";
    $result = @eval($str);
    if(round($result, 5) == 24) $out[] = substr($str, 7);
}

print_r($out);
die;

/**
 * 表达式
 * @param array $data
 * @param array $method
 * @return array
 */
function getExpression($data, $method)
{
    $count = count($data[0]);
    for($i=1; $i<$count; $i++)
    {
        $result = [];
        foreach ($data as $id=>&$v)
        {
            foreach ($method as $m)
            {
                $tmp = $v;
                $temp = ["({$v[0]}{$m}{$v[1]})"];
                unset($tmp[0], $tmp[1]);
                $temp = array_merge($temp, $tmp);
                $result[] = count($temp) == 1 ? $temp[0] : $temp;
            }
            unset($data[$id]);
        }
        $data = $result;
    }    
    return $data;
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
