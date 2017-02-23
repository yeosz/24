<?php

if(count($argv)<5) die('参数不足');

$number = [$argv[1], $argv[2], $argv[3], $argv[4]];

$list = place($number);
$all = getExpression();

$out = [];
foreach($all as $v)
{
    foreach($list as $vv)
    {
        $str = str_replace('a',$vv[0],$v);
        $str = str_replace('b',$vv[1],$str);
        $str = str_replace('c',$vv[2],$str);
        $str = "return " . str_replace('d',$vv[3],$str) . ";";
        $result = @eval($str);
        if(round($result,5)==24) $out[] = substr($str, 7);        
    }
}
$out = array_unique($out);

print_r($out);

/**
 * 表达式
 * @return array
 */
function getExpression()
{
    $expression = [
        'a?b??c???d',
        '(a?b)??c???d',
        '(a?b??c)???d',
        'a?(b??c)???d',
        '(a?b)??(c???d)',
        '((a?b)??c)???d',
        '(a?(b??c))???d',
        'a?(b??c???d)'
    ];

    $all = [];
    $c = ['+','-','*','/'];
    foreach($expression as $g)
    {
        foreach($c as $v)
        {
            foreach($c as $vv)
            {
                foreach($c as $vvv)
                {
                    $result = str_replace('???', $v, $g);
                    $result = str_replace('??', $vv, $result);
                    $result = str_replace('?', $vvv, $result);
                    $all[] = $result;
                }
            }
        }
    }
    return $all;    
}

/**
 * 排列
 * @param $arr
 * @return array
 */
function place($arr)
{
    $count = count($arr);
    if($count==1)
    {
        return [$arr];
    }
    else
    {
        $result = [];
        foreach($arr as $id=>$v)
        {
            $temp = $arr;
            $now = $temp[$id];
            unset($temp[$id]);
            $result1 = place($temp);
            foreach($result1 as $vv)
            {
                array_unshift($vv, $now);
                $result[] = $vv;
            }
        }
        return $result;
    }
}
